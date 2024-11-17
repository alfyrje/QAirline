from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .models import Passenger
from .serializers import PassengerSerializer
from .serializers import UserSerializer


class PassengerList(ListAPIView):
    queryset = Passenger.objects.all()
    serializer_class = PassengerSerializer

class RegisterView(ListAPIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)