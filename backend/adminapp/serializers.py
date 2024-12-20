from rest_framework import serializers
from users.models import User, Passenger
from travel_info.models import TravelInfo
from voucher.models import Voucher


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
        fields = ['id','first_name', 'last_name', 'qr_email', 'date_of_birth', 'citizen_id', 'nationality', 'gender']

class TravelInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelInfo
        fields = '__all__'

class VoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voucher
        fields = '__all__'

    from rest_framework import serializers
from .models import News

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'


from rest_framework import serializers
from .models import News

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'