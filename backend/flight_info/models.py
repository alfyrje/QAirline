from django.db import models

# Create your models here.
class FlightInfo(models.Model):
    type_of_info = models.CharField(max_length=100, primary_key=True, unique=True)
    info_picture = models.ImageField(upload_to='images_info/') 
    info_details = models.TextField() 
    def __str__(self):
        return self.type_of_info