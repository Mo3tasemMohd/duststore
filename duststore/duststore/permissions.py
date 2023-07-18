from rest_framework.permissions import BasePermission
from django.shortcuts import get_object_or_404

# For Autentication    
class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser and request.user.is_staff