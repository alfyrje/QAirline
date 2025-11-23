import time
from django.core.management.base import BaseCommand
from flights.models import Flight


class Command(BaseCommand):
    help = 'Benchmarks the speed of a search query'

    def add_arguments(self, parser):
        parser.add_argument('city', type=str, help='The start location to search for')

    def handle(self, *args, **kwargs):
        city = kwargs['city']

        self.stdout.write(f"Searching for flights starting from: {city}...")

        # 1. Start the timer
        start_time = time.time()

        # 2. Execute the query
        # IMPORTANT: Django QuerySets are 'lazy'. They don't hit the DB until you use the data.
        # We wrap it in list() to FORCE Django to fetch the data immediately for the test.
        flights = list(Flight.objects.filter(start_location=city))

        # 3. Stop the timer
        end_time = time.time()

        # 4. Calculate duration
        duration = end_time - start_time
        count = len(flights)

        self.stdout.write(f"Found {count} flights.")
        self.stdout.write(self.style.SUCCESS(f"Time taken: {duration:.6f} seconds"))