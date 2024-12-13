from django.db import models
from markdown import markdown

# Create your models here.
class TravelInfo(models.Model):
    title = models.CharField(max_length=100, primary_key=True, unique=True)
    html_content = models.TextField()  
