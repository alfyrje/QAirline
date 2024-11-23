from django.db import models

# Create your models here.
class CityIntroduction(models.Model):
    title = models.CharField(max_length=100)
    intro_img = models.ImageField(upload_to='images/')
    content = models.TextField()

    def __str__(self):
        return self.title