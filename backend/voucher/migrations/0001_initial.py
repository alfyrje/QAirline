# Generated by Django 5.1.2 on 2024-12-21 01:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Voucher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('voucher_code', models.CharField(max_length=100)),
                ('voucher_picture', models.ImageField(upload_to='images_voucher/')),
                ('percentage', models.IntegerField()),
                ('voucher_description', models.CharField()),
            ],
        ),
    ]
