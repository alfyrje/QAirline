from rest_framework import serializers
from users.models import User, Passenger

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'username', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = ['id','first_name', 'last_name', 'tel_num', 'date_of_birth', 'citizen_id', 'nationality', 'gender']