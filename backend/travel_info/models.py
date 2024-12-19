from django.db import models

# Create your models here.
class TravelInfo(models.Model):
    title = models.CharField(max_length=100)
    html_content = models.TextField()  
