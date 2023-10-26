from django.urls import path, re_path
from .views import get_csrf, serve_react, get_jobs, UserViewSet, JobViewSet, ApplicationViewSet, ContactViewSet
from rest_framework_nested import routers 

router = routers.SimpleRouter() 
router.register('users', UserViewSet)

users_router = routers.NestedSimpleRouter(router, 'users', lookup='user')
users_router.register('jobs', JobViewSet, basename="user-jobs")
users_router.register('applications', ApplicationViewSet, basename="user-apps")
users_router.register('contacts', ContactViewSet, basename="user-contains")

urlpatterns = [
    path('csrf', get_csrf),
    path('', serve_react, name='serve_react'),
    path('jobs', get_jobs)
]

urlpatterns += router.urls
urlpatterns += users_router.urls 

urlpatterns += [re_path('.*', serve_react),]