import random
from django.core.management.base import BaseCommand
from faker import Faker
from flights.models import Plane  # Ensure your model is named 'Plane' in flights/models.py


class Command(BaseCommand):
    help = 'Populates the database with random planes'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Indicates the number of planes to create')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        fake = Faker()

        manufacturers = ['Boeing', 'Airbus', 'Embraer', 'Bombardier', 'Cessna']

        # We use a batch size to avoid running out of memory
        batch_size = 1000
        objs = []

        self.stdout.write(f'Generating {total} planes...')

        for i in range(total):
            manufacturer = random.choice(manufacturers)
            # Generate a realistic name like "Boeing 747-X23"
            name = f"{manufacturer} {fake.bothify(text='??-###')}"

            econ_seats = random.randint(100, 400)
            biz_seats = random.randint(10, 50)

            plane = Plane(
                name=name,
                manufacturer=manufacturer,
                economic_seats=econ_seats,
                business_seats=biz_seats,
                economic_seats_info="Standard legroom, entertainment screens included.",
                business_seats_info="Full recline seats, premium meals included."
            )
            objs.append(plane)

            # Insert batch into database
            if len(objs) >= batch_size:
                Plane.objects.bulk_create(objs)
                objs = []
                self.stdout.write(f'Created {i + 1} planes...')

        # Insert any remaining objects
        if objs:
            Plane.objects.bulk_create(objs)

        self.stdout.write(self.style.SUCCESS(f'Successfully created {total} planes!'))