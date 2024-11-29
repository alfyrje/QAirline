# users/serializers.py
from rest_framework import serializers
from .models import User, Passenger
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        return token

class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = ['first_name', 'last_name', 'tel_num', 'date_of_birth', 'citizen_id', 'nationality', 'gender']
    def create(self, validated_data):
        citizen_id = validated_data.get("citizen_id")
        if citizen_id:
            existing_passenger = Passenger.objects.filter(citizen_id=citizen_id).first()
            if existing_passenger:
                return existing_passenger
        return super().create(validated_data)

class UserSerializer(serializers.ModelSerializer):
    personal_info = PassengerSerializer()

    class Meta:
        model = User
        fields = ['email', 'personal_info', 'username','password', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        personal_info_data = validated_data.pop('personal_info')
        passenger = Passenger.objects.create(**personal_info_data)
        user = User.objects.create(**validated_data)
        user.personal_info = passenger
        user.set_password(validated_data['password'])
        user.save()
        return user
    