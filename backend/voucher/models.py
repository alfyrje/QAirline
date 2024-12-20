from django.db import models
from flights.models import Flight
# Create your models here.


class Voucher(models.Model):
    voucher_code = models.CharField(
        max_length=100)
    voucher_picture = models.ImageField(upload_to='images_voucher/')
    percentage = models.IntegerField()
    voucher_description = models.CharField()
    # voucher_flight_code = models.ForeignKey(
    #     Flight,
    #     on_delete=models.CASCADE,
    #     to_field='code',
    #     related_name='vouchers'
    # )

    def __str__(self):
        return self.voucher_code
