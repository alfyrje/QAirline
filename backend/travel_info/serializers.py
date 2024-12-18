from rest_framework import serializers
from .models import TravelInfo

class TravelInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelInfo
        fields = ['html_content']