# Generated by Django 5.1.2 on 2024-12-12 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TravelInfo',
            fields=[
                ('title', models.CharField(max_length=100, primary_key=True, serialize=False, unique=True)),
                ('markdown_content', models.TextField(blank=True, help_text='Content in Markdown format')),
            ],
        ),
    ]
