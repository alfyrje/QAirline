from rest_framework import serializers
from .models import User

class UserSerializer(seralizers.ModelSerializer):
    class Meta:
        model = User
        fields = ['code', 'user_name', 'password', 'name', 'age', 'email', 'phone_number', 'address', 'created_at']
        read_only_fields = ['user_name','created_at']