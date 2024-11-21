# users/serializers.py
from rest_framework import serializers
from .models import User, Passenger

class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    personal_info = PassengerSerializer()

    class Meta:
        model = User
        fields = ['email', 'tel_num', 'personal_info', 'username','password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        personal_info_data = validated_data.pop('personal_info')
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    