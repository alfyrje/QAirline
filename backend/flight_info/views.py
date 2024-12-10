from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import FlightInfo
from .serializers import FlightInfoSerializer

class FlightInfoView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, type_of_info=None):
        if type_of_info is None:
            flight_infos = FlightInfo.objects.all()
            total_count = flight_infos.count()
            response_data = {
                'total_count': total_count,
                'results': [{
                    'image': request.build_absolute_uri(info.info_picture.url),
                    'title': info.type_of_info,
                    'description': info.info_details
                } for info in flight_infos]
            }
            return Response(response_data, status=status.HTTP_200_OK)

        try:
            flight_info = FlightInfo.objects.get(type_of_info=type_of_info)
            response_data = {
                'image': request.build_absolute_uri(flight_info.info_picture.url),
                'title': flight_info.type_of_info,
                'description': flight_info.info_details
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except FlightInfo.DoesNotExist:
            return Response(
                {"detail": "This type of info is not found."}, 
                status=status.HTTP_404_NOT_FOUND
            )