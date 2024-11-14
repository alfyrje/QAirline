from django.db import models
import uuid
from users.models import Passenger

class Plane(models.Model):
    plane_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    manufacturer = models.CharField(max_length=100)
    economic_seats = models.IntegerField()
    business_seats = models.IntegerField()
    economic_seats_info = models.JSONField(null=True)
    business_seats_info = models.JSONField(null=True)

class Flight(models.Model):
    flight_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    plane = models.ForeignKey(Plane, on_delete=models.CASCADE)
    start_location = models.CharField(max_length=100)
    end_location = models.CharField(max_length=100)
    start_time = models.TimeField()
    end_time = models.TimeField()
    delay_status = models.IntegerField()

class Ticket(models.Model):
    ticket_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booker = models.ForeignKey(Passenger, on_delete=models.CASCADE)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    seat = models.CharField(max_length=10)
    CLASS_CHOICES = [
        ('E', 'Economic'),
        ('B', 'Business'),
    ]
    ticket_class = models.CharField(max_length=1, choices=CLASS_CHOICES, default='E')