# Generated by Django 5.1.2 on 2024-11-15 03:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flights', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='flight',
            name='code',
            field=models.CharField(default='QH demo', max_length=10),
            preserve_default=False,
        ),
    ]
