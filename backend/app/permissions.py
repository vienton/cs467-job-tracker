from rest_framework import permissions 

class UserPermission(permissions.BasePermission):
    message = 'User is not allowed'

    def has_object_permission(self, request, view, obj):
        if view.action == 'retrieve':
            return int(view.kwargs['pk']) == request.user.id
        return request.user.is_superuser or request.user.id == obj.id
