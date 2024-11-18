from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
from django.db import models
import uuid

class Passenger(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
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

class User(AbstractUser):
    email = models.CharField(max_length=30)
    tel_num = models.CharField(max_length=20)
    personal_info = models.OneToOneField(Passenger, on_delete=models.SET_NULL, null=True)