from django.db import models

# Create your models here.
from django.db import models
import string
import random

def generate_unique_code():
    length = 30

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if User.objects.filter(code=code).count() == 0:
            break

    return code

class User(models.Model):
    code = models.CharField(max_length=30, primary_key=True, unique=True)
    user_name = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    name = models.CharField(max_length=50)
    age = models.IntegerField(null = False, default = 1)
    email = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_name