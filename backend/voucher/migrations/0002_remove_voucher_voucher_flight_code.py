# Generated by Django 5.1.2 on 2024-12-20 15:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('voucher', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='voucher',
            name='voucher_flight_code',
        ),
    ]
