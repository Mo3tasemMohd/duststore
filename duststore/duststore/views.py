from rest_framework.response import Response
from rest_framework.decorators import (api_view, authentication_classes, permission_classes)


@api_view(["GET"])
def home(request):
        return Response({'This Is The Main Page'}, status=200)
