# Generated by Django 5.1.2 on 2024-12-13 08:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CityIntroduction',
            fields=[
                ('city_name', models.CharField(max_length=100, primary_key=True, serialize=False, unique=True)),
                ('introduce_picture', models.ImageField(upload_to='images_new/')),
                ('city_introduction', models.TextField()),
            ],
        ),
    ]
