from django.contrib.auth.models import User 
from .models import Job, Application, Contact 
from rest_framework import serializers
from .permissions import UserPermission


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job 
        fields = "__all__"

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact 
        fields = "__all__"

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application 
        fields = "__all__"



class UserSerializer(serializers.ModelSerializer):
    permissions = (UserPermission,)

    jobs = JobSerializer(many=True, read_only=True)
    contacts = ContactSerializer(many=True, read_only=True)
    applications = ApplicationSerializer(many=True, read_only=True)

    class Meta:
        model = User 
        fields = [
            'id', 
            'username', 
            'first_name', 
            'last_name', 
            'email', 
            'jobs', 
            'contacts', 
            'applications',
            'applied_jobs',
            'saved_jobs'
        ]