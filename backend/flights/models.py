from django.db import models
import uuid
from users.models import Passenger

class Plane(models.Model):
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    economic_seats = models.IntegerField()
    business_seats = models.IntegerField()
    economic_seats_info = models.JSONField(null=True, blank=True)
    business_seats_info = models.JSONField(null=True, blank=True)

class Flight(models.Model):
    plane = models.ForeignKey(Plane, on_delete=models.CASCADE)
    start_location = models.CharField(max_length=100)
    end_location = models.CharField(max_length=100)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    delay_status = models.IntegerField()

class Ticket(models.Model):
    booker = models.ForeignKey(Passenger, on_delete=models.CASCADE)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    seat = models.CharField(max_length=10)
    CLASS_CHOICES = [
        ('E', 'Economic'),
        ('B', 'Business'),
    ]
    ticket_class = models.CharField(max_length=1, choices=CLASS_CHOICES, default='E')