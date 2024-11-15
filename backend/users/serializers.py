# users/serializers.py
from rest_framework import serializers
from .models import User, Passenger  # or your actual model name

class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    personal_info = PassengerSerializer()

    class Meta:
        model = User
        fields = ['user_id', 'email', 'personal_info']