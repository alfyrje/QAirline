from django.db import models
import uuid
from users.models import Passenger, User

class Plane(models.Model):
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    economic_seats = models.IntegerField()
    business_seats = models.IntegerField()
    economic_seats_info = models.JSONField(null=True, blank=True)
    business_seats_info = models.JSONField(null=True, blank=True)
    def __str__(self):
        return f"{self.name}"

class Flight(models.Model):
    plane = models.ForeignKey(Plane, on_delete=models.CASCADE)
    code = models.CharField(max_length=10)
    start_location = models.CharField(max_length=100)
    end_location = models.CharField(max_length=100)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    delay_status = models.IntegerField()
    @property
    def duration(self):
        return self.end_time - self.start_time
    @property
    def economic_seats_left(self):
        booked_economic = Ticket.objects.filter(flight=self, ticket_class='E').count()
        return self.plane.economic_seats - booked_economic
    @property
    def business_seats_left(self):
        booked_business = Ticket.objects.filter(flight=self, ticket_class='B').count()
        return self.plane.business_seats - booked_business
    @property
    def economic_price(self):
        return 5000000  # Placeholder price
    @property
    def business_price(self):
        return 10000000  # Placeholder price
    def __str__(self):
        return f"{self.code}"

class Ticket(models.Model):
    booker = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    passenger = models.ForeignKey(Passenger, on_delete=models.CASCADE)
    seat = models.CharField(max_length=10)
    CLASS_CHOICES = [
        ('E', 'Economic'),
        ('B', 'Business'),
    ]
    ticket_class = models.CharField(max_length=1, choices=CLASS_CHOICES, default='E')
    def __str__(self):
        return f"{self.booker} - {self.passenger} - {self.flight} - {self.ticket_class}"