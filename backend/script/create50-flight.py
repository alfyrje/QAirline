#!/usr/bin/env python3
r"""
Utility script to create 50 example Flight objects for the next day.
Run from the repository with the backend venv active, for example:
    (.venv) PS> python backend\script\create50-flight.py

The script will ensure a superuser `admin` with password `admin` exists (email admin@example.com)
and will create a default Plane if none exist. It then creates 50 flights on the next day with
random times, durations and locations.
"""

# Robustly find the Django backend folder and add it to sys.path so imports work
from pathlib import Path
import sys
import os
import random
import string
from datetime import timedelta

HERE = Path(__file__).resolve().parent
backend_path = None
candidate = HERE
for _ in range(6):
    if (candidate / 'manage.py').exists() or (candidate / 'QAirline' / 'settings.py').exists():
        backend_path = candidate
        break
    candidate = candidate.parent

if backend_path is None:
    # best-effort fallbacks
    if HERE.name.lower() == 'script' and HERE.parent.name.lower() == 'backend':
        backend_path = HERE.parent
    elif HERE.name.lower() == 'backend':
        backend_path = HERE
    else:
        backend_path = HERE.parent

if str(backend_path) not in sys.path:
    sys.path.insert(0, str(backend_path))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'QAirline.settings')

import django
django.setup()

from django.utils import timezone
from django.contrib.auth import get_user_model
from flights.models import Flight, Plane

User = get_user_model()

# Create admin user if missing
ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD = 'admin'
ADMIN_EMAIL = 'admin@example.com'

if not User.objects.filter(username=ADMIN_USERNAME).exists():
    User.objects.create_superuser(ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD)
    print(f"Created superuser: {ADMIN_USERNAME}/{ADMIN_PASSWORD}")
else:
    print(f"Superuser '{ADMIN_USERNAME}' already exists")

# Ensure at least one Plane exists
planes = list(Plane.objects.all())
if not planes:
    p = Plane.objects.create(
        name='Default Plane 737', manufacturer='Boeing', economic_seats=150, business_seats=20
    )
    planes = [p]
    print('Created default plane:', p.name)
else:
    print(f'Found {len(planes)} existing plane(s)')

# Sample cities
CITIES = [
    'Hanoi', 'Ho Chi Minh', 'Da Nang', 'Nha Trang', 'Phu Quoc',
    'Can Tho', 'Hue', 'Vinh', 'Quy Nhon', 'Buon Ma Thuot'
]

# Start base = next day at 06:00 local
now = timezone.now()
start_base = (now + timedelta(days=1)).replace(hour=6, minute=0, second=0, microsecond=0)

created_codes = []

for i in range(50):
    # random start between 06:00 and 20:00
    start = start_base + timedelta(minutes=random.randint(0, 14 * 60))
    duration_hours = random.randint(1, 5)
    end = start + timedelta(hours=duration_hours)
    start_loc, end_loc = random.sample(CITIES, 2)

    # generate unique code
    for _ in range(20):
        code = 'QA' + ''.join(random.choices(string.digits, k=4))
        if not Flight.objects.filter(code=code).exists():
            break
    else:
        # fallback
        code = f'QA{int(timezone.now().timestamp()) % 100000}'

    plane = random.choice(planes)

    flight = Flight.objects.create(
        plane=plane,
        code=code,
        start_location=start_loc,
        end_location=end_loc,
        start_time=start,
        end_time=end,
        delay_status=0,
    )

    created_codes.append(code)

print(f"Created {len(created_codes)} flights for {start_base.date()}")
for c in created_codes:
    print(c)

print('\nDone.')
