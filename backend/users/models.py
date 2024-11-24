from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
from django.db import models
import uuid
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta, datetime
from django.utils import timezone

class Passenger(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    tel_num = models.CharField(max_length=20)
    date_of_birth = models.DateField()
    citizen_id = models.CharField(max_length=50)
    nationality = models.CharField(max_length=20)
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    gender = models.CharField(
        max_length=1,
        choices=GENDER_CHOICES,
        default='O',
    )
    
    related_user = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='relatives',
        null=True,
        blank=True
    )
    def __str__(self):
        return f"{self.first_name} {self.last_name}" 

class User(AbstractUser):
    tel_num = models.CharField(max_length=20)
    personal_info = models.OneToOneField(Passenger, on_delete=models.SET_NULL, null=True)
    def __str__(self):
        return f"{self.email}"
    
def default_expiry():
    return timezone.now() + timezone.timedelta(minutes=5)