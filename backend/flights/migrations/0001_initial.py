# Generated by Django 5.1.2 on 2024-12-04 06:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Plane',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('manufacturer', models.CharField(max_length=100)),
                ('economic_seats', models.IntegerField()),
                ('business_seats', models.IntegerField()),
                ('economic_seats_info', models.JSONField(blank=True, null=True)),
                ('business_seats_info', models.JSONField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('seat', models.CharField(max_length=10)),
                ('cancelled', models.BooleanField(blank=True, default=False)),
                ('ticket_class', models.CharField(choices=[('E', 'Economic'), ('B', 'Business')], default='E', max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='Flight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=10)),
                ('start_location', models.CharField(max_length=100)),
                ('end_location', models.CharField(max_length=100)),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('delay_status', models.IntegerField()),
                ('plane', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='flights.plane')),
            ],
        ),
    ]
