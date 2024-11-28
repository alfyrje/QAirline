from django.db import models

# Create your models here.

class CityIntroduction(models.Model):
    city_name = models.CharField(max_length=100, primary_key=True, unique=True)
    introduce_picture = models.ImageField(upload_to='images_new/') 
    city_introduction = models.TextField() 
    def __str__(self):
        return self.city_name