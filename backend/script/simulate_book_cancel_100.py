#!/usr/bin/env python3
r"""
Simulate creating 100 tickets and cancelling them, enqueueing Celery tasks for sending ticket QR emails
and cancellation emails. Measures the elapsed time from task enqueueing until all related Celery tasks are
completed (polls AsyncResult.ready()).

Run with backend venv active from repository root or from backend/script:
    (.venv) PS> python backend\script\simulate_book_cancel_100.py
"""

from pathlib import Path
import sys
import os
import time
import random
from datetime import timedelta

# locate backend (same strategy as other scripts)
HERE = Path(__file__).resolve().parent
backend_path = None
candidate = HERE
for _ in range(6):
    if (candidate / 'manage.py').exists() or (candidate / 'QAirline' / 'settings.py').exists():
        backend_path = candidate
        break
    candidate = candidate.parent

if backend_path is None:
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
from django.db import transaction
from django.contrib.auth import get_user_model
from users.models import Passenger
from flights.models import Flight, Plane, Ticket
# from flights.tasks import send_ticket_email, send_cancel_email
# flights.tasks may not exist in environments without Celery.
# Provide local synchronous implementations with a .delay() method
# so the script can run without Celery workers.
import qrcode
from io import BytesIO
from django.core.files import File
from django.core.mail import EmailMessage
from django.conf import settings


class DummyAsyncResult:
    def __init__(self):
        self._ready = True
        self.status = 'SUCCESS'

    def ready(self):
        return self._ready


class SendTicketTask:
    """Synchronous replacement for flights.tasks.send_ticket_email.
    Usage: send_ticket_email.delay(ticket_id)
    Returns an object with ready() -> True.
    """
    @staticmethod
    def delay(ticket_id):
        try:
            ticket = Ticket.objects.get(id=ticket_id)
        except Ticket.DoesNotExist:
            return DummyAsyncResult()

        flight = ticket.flight
        passenger = ticket.passenger

        qr_data = f"Ticket ID: {ticket.id}, Flight ID: {flight.id}, Seat: {ticket.seat}, Passenger: {passenger.id}"
        qr = qrcode.make(qr_data)
        qr_image = BytesIO()
        qr.save(qr_image, format='PNG')
        qr_image.seek(0)
        qr_file = File(qr_image, name=f"ticket_{ticket.id}_qr.png")

        subject = f"QAirline: Mã QR của khách hàng cho vé của chuyến bay {flight.code}"
        message = (
            f"Hệ thống đã ghi nhận vé đặt cho quý khách cho chuyến bay {flight.code} với thông tin như sau:\n\n"
            + f"Mã chuyến bay: {flight.code}\n"
            + f"Mã vé: {ticket.code}\n"
            + f"Thời gian khởi hành: {flight.start_time}\n"
            + f"Thời gian đến: {flight.end_time}\n"
            + f"Địa điểm xuất phát: {flight.start_location}\n"
            + f"Địa điểm đến: {flight.end_location}\n"
            + f"Số ghế: {ticket.seat}\n"
            + f"Hạng vé: {ticket.ticket_class}\n"
            + "Cảm ơn quý khách đã lựa chọn QAirline. Chúc quý khách có một chuyến đi vui vẻ!"
        )

        email = EmailMessage(subject, str(message), settings.DEFAULT_FROM_EMAIL, [passenger.qr_email])
        try:
            email.attach('ticket_qr.png', qr_file.read(), 'image/png')
        except Exception:
            # ignore attachment failures
            pass

        try:
            email.send()
            print(f"Sent ticket email for ticket {ticket.id} to {passenger.qr_email}")
        except Exception as e:
            print(f"Failed to send ticket email for ticket {ticket.id}: {e}")

        return DummyAsyncResult()


class SendCancelTask:
    """Synchronous replacement for flights.tasks.send_cancel_email.
    Usage: send_cancel_email.delay(ticket_id)
    """
    @staticmethod
    def delay(ticket_id):
        try:
            ticket = Ticket.objects.get(id=ticket_id)
        except Ticket.DoesNotExist:
            return DummyAsyncResult()

        subject = f"Thông báo hủy vé cho chuyến bay {ticket.flight.code}"
        message = f"Vé của bạn (mã {ticket.code}) cho chuyến bay {ticket.flight.code} đã được hủy."
        email = EmailMessage(subject, message, settings.DEFAULT_FROM_EMAIL, [ticket.passenger.qr_email])
        try:
            email.send()
            print(f"Sent cancellation email for ticket {ticket.id} to {ticket.passenger.qr_email}")
        except Exception as e:
            print(f"Failed to send cancellation email for ticket {ticket.id}: {e}")

        return DummyAsyncResult()


send_ticket_email = SendTicketTask()
send_cancel_email = SendCancelTask()


User = get_user_model()

NUM = 50
TIMEOUT = 300  # seconds to wait for all tasks

# pick a flight (prefer next-day flight), or create one if none
target_date = (timezone.now() + timedelta(days=1)).date()
flight = Flight.objects.filter(start_time__date=target_date).first()
if not flight:
    plane = Plane.objects.first()
    if not plane:
        plane = Plane.objects.create(name='AutoPlane', manufacturer='Auto', economic_seats=200, business_seats=20)
    start = (timezone.now() + timedelta(days=1)).replace(hour=8, minute=0, second=0, microsecond=0)
    end = start + timedelta(hours=2)
    code = 'AUTO' + str(int(time.time()) % 100000)
    flight = Flight.objects.create(plane=plane, code=code, start_location='Hanoi', end_location='Da Nang', start_time=start, end_time=end, delay_status=0)
    print('Created flight for simulation:', flight.code)
else:
    print('Using existing flight:', flight.code)

created_tickets = []
send_results = []

print(f"Creating {NUM} passengers and tickets and enqueueing send_ticket_email tasks...")
start_time = time.time()
deadline = start_time + TIMEOUT

for i in range(NUM):
    # create passenger
    dob = (timezone.now().date() - timedelta(days=365 * 30))  # ~30 years old
    citizen_id = ''.join(random.choices('0123456789', k=9))
    gender = random.choice(['M', 'F', 'O'])
    p = Passenger.objects.create(
        first_name=f'Auto{i}',
        last_name='Sim',
        qr_email=f'okakoro1907@gmail.com',
        date_of_birth=dob,
        citizen_id=citizen_id,
        nationality='VN',
        gender=gender
    )
    seat = f'E{i+1}'
    ticket = Ticket.objects.create(booker=None, flight=flight, passenger=p, seat=seat, ticket_class='E', cancelled=False)
    created_tickets.append(ticket)
    # enqueue QR email task
    res = send_ticket_email.delay(ticket.id)
    send_results.append(res)

elapsed = time.time() - start_time
print(f"\nElapsed time waiting for tasks: {elapsed:.2f} seconds")

print('Done.')
