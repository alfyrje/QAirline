from django.db import models
import uuid
from users.models import Passenger, User
import random
import string

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
    code = models.CharField(max_length=10, unique=True)
    start_location = models.CharField(max_length=100)
    end_location = models.CharField(max_length=100)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    delay_status = models.IntegerField()
    
    available_economic_seats = models.IntegerField(default=0)
    available_business_seats = models.IntegerField(default=0)

    @property
    def duration(self):
        return self.end_time - self.start_time
    @property
    def economic_seats_left(self):
        booked_economic = Ticket.objects.filter(flight=self, ticket_class='E', cancelled=False).count()
        return self.plane.economic_seats - booked_economic
    @property
    def business_seats_left(self):
        booked_business = Ticket.objects.filter(flight=self, ticket_class='B', cancelled=False).count()
        return self.plane.business_seats - booked_business
    economic_price = models.IntegerField(default=5000000)
    business_price = models.IntegerField(default=10000000)
    
    def save(self, *args, **kwargs):
        if not self.pk:
            self.available_economic_seats = self.plane.economic_seats
            self.available_business_seats = self.plane.business_seats
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.code}"

def generate_ticket_code():
    chars = string.ascii_uppercase + string.digits
    
    def create_code():
        return ''.join(random.choices(chars, k=6))
    
    code = create_code()
    while Ticket.objects.filter(code=code).exists():
        code = create_code()
    
    return code

class Ticket(models.Model):
    code = models.CharField(max_length=10, unique=True, default=generate_ticket_code, editable=False)
    booker = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    passenger = models.ForeignKey(Passenger, on_delete=models.CASCADE)
    seat = models.CharField(max_length=10)
    cancelled = models.BooleanField(default=False, blank=True)
    CLASS_CHOICES = [
        ('E', 'Economic'),
        ('B', 'Business'),
    ]
    ticket_class = models.CharField(max_length=1, choices=CLASS_CHOICES, default='E')
    
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['flight', 'seat'],
                condition=models.Q(cancelled=False),
                name='unique_active_seat_per_flight'
            )
        ]
    
    def save(self, *args, **kwargs):
        if self.pk:
            old_ticket = Ticket.objects.get(pk=self.pk)
            if not old_ticket.cancelled and self.cancelled:
                if self.ticket_class == 'E':
                    self.flight.available_economic_seats += 1
                else:
                    self.flight.available_business_seats += 1
                self.flight.save()
            elif old_ticket.cancelled and not self.cancelled:
                if self.ticket_class == 'E':
                    self.flight.available_economic_seats -= 1
                else:
                    self.flight.available_business_seats -= 1
                self.flight.save()
        else:
            if self.ticket_class == 'E':
                self.flight.available_economic_seats -= 1
            else:
                self.flight.available_business_seats -= 1
            self.flight.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.booker} - {self.passenger} - {self.flight} - {self.ticket_class}"