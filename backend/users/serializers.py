# users/serializers.py
from rest_framework import serializers
from .models import User  # or your actual model name

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  # or specify fields explicitly, e.g., ['id', 'username', 'email']