import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from faker import Faker
from flights.models import Plane, Flight  # Ensure 'Flight' is imported correctly


class Command(BaseCommand):
    help = 'Populates the database with random flights'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Number of flights to create')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        fake = Faker()

        # 1. Get all Plane IDs into memory
        self.stdout.write('Fetching plane IDs...')
        plane_ids = list(Plane.objects.values_list('id', flat=True))

        if not plane_ids:
            self.stdout.write(self.style.ERROR('No planes found! Run populate_planes first.'))
            return

        # 2. NEW: Fetch all existing flight codes to prevent duplicates
        # This prevents the IntegrityError by knowing what already exists
        self.stdout.write('Fetching existing flight codes...')
        existing_codes = set(Flight.objects.values_list('code', flat=True))

        batch_size = 2000
        objs = []

        self.stdout.write(f'Generating {total} flights...')

        for i in range(total):
            random_plane_id = random.choice(plane_ids)

            start_time = fake.date_time_this_year(before_now=False, after_now=True,
                                                  tzinfo=timezone.get_current_timezone())

            duration_hours = random.randint(1, 14)
            end_time = start_time + timedelta(hours=duration_hours)

            start_loc = fake.city()
            end_loc = fake.city()
            while start_loc == end_loc:
                end_loc = fake.city()

            # NEW: Generate a unique code
            code = fake.bothify(text='??####').upper()
            while code in existing_codes:
                # If duplicate, generate again until unique
                code = fake.bothify(text='??####').upper()
            existing_codes.add(code)

            flight = Flight(
                plane_id=random_plane_id,
                code=code,  # Use the verified unique code
                start_location=start_loc,
                end_location=end_loc,
                start_time=start_time,
                end_time=end_time,
                delay_status=random.choice([1]),
                economic_price=random.randrange(100, 1000) * 1000,
                business_price=random.randrange(200, 2000) * 1000,
            )
            objs.append(flight)

            if len(objs) >= batch_size:
                Flight.objects.bulk_create(objs)
                objs = []
                self.stdout.write(f'Created {i + 1} flights...')

        if objs:
            Flight.objects.bulk_create(objs)

        self.stdout.write(self.style.SUCCESS(f'Successfully created {total} flights!'))