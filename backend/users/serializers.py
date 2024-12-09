from rest_framework import serializers
from .models import User, Passenger

class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = ['first_name', 'last_name', 'qr_email', 'date_of_birth', 'citizen_id', 'nationality', 'gender']
    def create(self, validated_data):
        citizen_id = validated_data.get("citizen_id")
        if citizen_id:
            existing_passenger = Passenger.objects.filter(citizen_id=citizen_id).first()
            if existing_passenger:
                return existing_passenger
        return super().create(validated_data)
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
        fields = ['email', 'first_name', 'last_name', 'personal_info', 'username','password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        personal_info_data = validated_data.pop('personal_info')
        passenger = Passenger.objects.create(**personal_info_data)
        passenger = Passenger.objects.create(**personal_info_data)
        user = User.objects.create(**validated_data)
        user.personal_info = passenger
        user.personal_info = passenger
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)