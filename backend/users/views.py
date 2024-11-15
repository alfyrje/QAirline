from rest_framework.generics import ListAPIView
from .models import Passenger
from .serializers import PassengerSerializer

class PassengerList(ListAPIView):
    queryset = Passenger.objects.all()
    serializer_class = PassengerSerializer