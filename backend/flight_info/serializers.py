from rest_framework import serializers
from .models import FlightInfo

class FlightInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightInfo
        fields = '__all__'