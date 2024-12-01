from rest_framework import serializers
from .models import CityIntroduction

class CityIntroductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityIntroduction
        fields = '__all__'