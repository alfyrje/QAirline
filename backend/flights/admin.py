from django.contrib import admin
from .models import Flight, Ticket, Plane

# Register your models here.
admin.site.register(Flight)
admin.site.register(Ticket)
admin.site.register(Plane)