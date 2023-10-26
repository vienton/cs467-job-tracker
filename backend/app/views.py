from django.shortcuts import render
from django.core import serializers as core_serializers
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.decorators import api_view, permission_classes, action
from django.middleware.csrf import get_token 
from django.contrib.auth.models import User 
from .serializers import UserSerializer, JobSerializer, ApplicationSerializer, ContactSerializer
from .permissions import UserPermission
from .models import Job, Application, Contact 
from datetime import date 
from django.shortcuts import render

@api_view(["get"])
def get_jobs(request):
    jobs = Job.objects.all().order_by("-createdAt")
    return Response({ "status": "success", "data": JobSerializer(jobs, many=True).data})

@api_view(["get"])
def get_csrf(request):
    return Response({ "csrf": get_token(request)})

@api_view(["get"])
def serve_react(request):
    return render(request, "index.html")

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    

    def get_permissions(self):
        if self.action == 'list':
            return (IsAuthenticated(),)
        elif self.action == 'create':
            return (AllowAny(),)
        return (UserPermission(),)

    def create(self, request):
        username = request.data['username']
        email = request.data['email']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        password = request.data['password']
        try:
            User.objects.create_user(username=username, email=email, last_name=last_name, first_name=first_name, password=password)
        except Exception as e:
            print('error creating user', e)
            return Response({ "status": "error" })
        return Response({ "status" : "success"})
    


class JobViewSet(ModelViewSet):
    # i think we should have the ability to get jobs for user and all jobs?
    # i guess have a separate url /jobs and just fetch all?
    serializer_class = JobSerializer
    def get_queryset(self):
        return Job.objects.filter(user=self.kwargs['user_pk'])
    
    @action(detail=True, methods=["post"])
    def save(self, request, user_pk, pk):
        # save a job 
        try:
            user = User.objects.get(pk=user_pk)
            job = Job.objects.get(pk=pk)
            job.saved.add(user)
            return Response({ "status": "success" })
        except Exception as e:
            print('an error ocurred saving the job')
            return Response({ "status": "error" })


    @action(detail=True, methods=["post"])
    def apply(self, request, user_pk, pk):
        # update job to be applied 
        user =  User.objects.get(pk=user_pk)
        if user.applied_jobs.filter(id=pk):
            return Response({ 'status': "error", "msg": "already applied" })
        try:
            job = Job.objects.get(pk=pk)
            job.applied.add(user)
            job.save()
            # create application
            data = request.data
            app = Application.objects.create(
                user=user, 
                job_status='open', 
                job_title=data['job_title'], 
                company=data['company'],
                description=data['description'],
                url=data['url'],
                close_date=date.fromisoformat(data['close_date']),
                requisition_id=data['requisition_id']
            )
            return Response({ 'status': 'success', "data": ApplicationSerializer(app).data })
        except Exception as e:
            print('an error occurred applying to the job', e)
            return Response({ 'status': 'error '})
    
    def update(self, request, user_pk, pk):
        data = request.data
        del data['applied']
        del data['saved']
        data["open_date"] = date.fromisoformat(data["open_date"])
        data["close_date"] = date.fromisoformat(data["close_date"])
        try:
            Job.objects.filter(id=data["id"]).update(**data)

        except Exception as e:
            print("there was an error updating jobs", e) 
            return Response({ "status": "fail" })
        return Response({ "status": "success" })   

    def create(self, request, user_pk):
        data = request.data 
        data["user"] = User.objects.get(id=user_pk)
        data["open_date"] = date.fromisoformat(data["open_date"])
        data["close_date"] = date.fromisoformat(data["close_date"])
        try:
            job = Job.objects.create(**data)
        except Exception as e:
            print("an error occured", e)
            return Response({ "status": "fail"})
        return Response({ "status": "success", "data": JobSerializer(job).data })



class ContactViewSet(ModelViewSet):
    serializer_class = ContactSerializer
    def get_queryset(self):
        return Contact.objects.filter(user=self.kwargs['user_pk'])

    def create(self, request, user_pk):
        data = request.data
        data['created'] = date.today()
        data['last_modified'] = date.today()
        data['user'] = User.objects.get(id=user_pk)
        try:
            instance = Contact.objects.create(**data)
        except Exception as e:
            print("an error occured", e)
            return Response({ "status": "fail"})
        return Response({ "status": "success", "payload": ContactSerializer(instance).data})
    
    def update(self, request, user_pk, pk):
        data = request.data
        data['last_modified'] = date.today()
        try:
            Contact.objects.filter(id=data["id"]).update(**data)

        except Exception as e:
            print("there was an error updating the contact", e) 
            return Response({ "status": "fail" })

        return Response({ "status": "success" })  
    
    def destroy(self, request, user_pk, pk):
        data = request.data
        try:
            Contact.objects.filter(id=data["id"]).delete()
            
        except Exception as e:
            print("there was an error deleting the contact", e) 
            return Response({ "status": "fail" })

        return Response({ "status": "success" })  
    
    def list(self, request, user_pk):
        try:
            data = Contact.objects.all(user=user_pk)
        except Exception as e:
            print('an error occured', e)
            return Response({'status': 'fail'})
        return Response({'status': 'success', 'data': data})

class ApplicationViewSet(ModelViewSet):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        return Application.objects.filter(user=self.kwargs['user_pk'])

    def create(self, request, user_pk):
        data = request.data
        data['user'] = User.objects.get(id=user_pk)
        try:
            instance = Application.objects.create(**data)
        except Exception as e:
            print("an error occured", e)
            return Response({ "status": "fail"})
        return Response({ "status": "success", "payload": ApplicationSerializer(instance).data})

    def update(self, request, user_pk, pk):
        data = request.data
        try:
            Application.objects.filter(id=data["id"]).update(**data)

        except Exception as e:
            print("there was an error updating the application", e) 
            return Response({ "status": "fail" })

        return Response({ "status": "success" })

    def destroy(self, request, user_pk, pk):
        data = request.data
        try:
            Application.objects.filter(id=data["id"]).delete()
            
        except Exception as e:
            print("there was an error deleting the application", e) 
            return Response({ "status": "fail" })

        return Response({ "status": "success" })

    def list(self, request, user_pk):
        try:
            data = Application.objects.all(user=user_pk)
        except Exception as e:
            print('an error occured', e)
            return Response({'status': 'fail'})
        return Response({'status': 'success', 'data': data})