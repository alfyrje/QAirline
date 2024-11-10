# users/views.py
from rest_framework.generics import ListAPIView
from .models import User  # or your actual model name
from .serializers import UserSerializer

class UsersList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer