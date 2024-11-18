# Generated by Django 5.1.2 on 2024-11-17 15:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('flights', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='booker',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.passenger'),
        ),
        migrations.AddField(
            model_name='ticket',
            name='flight',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='flights.flight'),
        ),
    ]
