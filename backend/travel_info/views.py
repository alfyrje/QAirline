from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TravelInfo
from .serializers import TravelInfoSerializer
from rest_framework.permissions import AllowAny

class TravelInfoView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, title):
        try:
            travel_info = TravelInfo.objects.get(title=title)
            serializer = TravelInfoSerializer(travel_info)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except TravelInfo.DoesNotExist:
            return Response({"detail": "travel info not found."}, status=status.HTTP_404_NOT_FOUND)
