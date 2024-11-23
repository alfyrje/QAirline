from rest_framework import serializers
from .models import Flight, Plane, Ticket

class FlightSerializer(serializers.ModelSerializer):
    duration = serializers.SerializerMethodField()
    economic_seats_left = serializers.SerializerMethodField()
    business_seats_left = serializers.SerializerMethodField()
    economic_price = serializers.SerializerMethodField()
    business_price = serializers.SerializerMethodField()

    class Meta:
        model = Flight
        fields = [
            'id', 'plane', 'code', 'start_location', 'end_location', 
            'start_time', 'end_time', 'delay_status', 
            'duration', 'economic_seats_left', 'business_seats_left',
            'economic_price', 'business_price'
        ]

    def get_duration(self, obj):
        return obj.duration.total_seconds()

    def get_economic_seats_left(self, obj):
        return obj.economic_seats_left

    def get_business_seats_left(self, obj):
        return obj.business_seats_left

    def get_economic_price(self, obj):
        return obj.economic_price

    def get_business_price(self, obj):
        return obj.business_price

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = [
            'booker', 'passenger', 'flight', 'seat', 'ticket_class'
        ]

class PlaneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plane
        fields = '__all__'