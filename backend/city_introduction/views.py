from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CityIntroduction
from .serializers import CityIntroductionSerializer

class CityIntroductionView(APIView):
    def get(self, request, city_name):
        try:
            # Fetch the city information from the database
            city = CityIntroduction.objects.get(city_name=city_name)
            serializer = CityIntroductionSerializer(city)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except CityIntroduction.DoesNotExist:
            return Response({"detail": "City not found."}, status=status.HTTP_404_NOT_FOUND)
