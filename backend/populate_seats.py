import os
import sys
import time
import random
from datetime import timedelta
import django
from django.utils import timezone
from django.db import connection, reset_queries

# Add backend to sys.path so we can import from it
sys.path.append(os.path.join(os.getcwd(), 'backend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'QAirline.settings')
django.setup()

from flights.models import Flight, Ticket, Plane
from users.models import User, Passenger

def create_sample_data():
    print("Checking for sample data...")
    
    plane, created = Plane.objects.get_or_create(
        name="Benchmark Boeing 777",
        defaults={
            'manufacturer': "Boeing",
            'economic_seats': 200,
            'business_seats': 50,
            'economic_seats_info': {},
            'business_seats_info': {}
        }
    )
    if created:
        print(f"Created plane: {plane}")

    user, created = User.objects.get_or_create(
        username="benchmark_bot",
        defaults={'email': 'bot@qairline.com'}
    )
    if created:
        user.set_password('password123')
        user.save()

    passenger, created = Passenger.objects.get_or_create(
        citizen_id="000000001",
        defaults={
            'first_name': "Benchmark",
            'last_name': "Bot",
            'gender': "O",
            'date_of_birth': "1990-01-01",
            'nationality': "Vietnam",
            'qr_email': "bot@qairline.com"
        }
    )

    target_count = 100
    current_count = Flight.objects.count()
    
    if current_count < target_count:
        needed = target_count - current_count
        print(f"Generating {needed} flights with random bookings...")
        
        now = timezone.now()
        for i in range(needed):
            flight_code = f"BM{random.randint(1000, 9999)}{i}"
            while Flight.objects.filter(code=flight_code).exists():
                flight_code = f"BM{random.randint(1000, 9999)}{i}"

            flight = Flight.objects.create(
                plane=plane,
                code=flight_code,
                start_location="Hanoi",
                end_location="Ho Chi Minh City",
                start_time=now + timedelta(days=i),
                end_time=now + timedelta(days=i, hours=2),
                delay_status=0
            )
            

            num_tickets = random.randint(0, 150)

            tickets_to_create = []
            for j in range(num_tickets):
                try:
                    Ticket.objects.create(
                        booker=user,
                        flight=flight,
                        passenger=passenger,
                        seat=f"E{j}",
                        ticket_class='E'
                    )
                except Exception as e:
                    print(f"Error creating ticket: {e}")
        print("Data generation complete.")
    else:
        print(f"Found {current_count} flights. Skipping generation.")

def populate():
    print("Populating available seats fields...")
    flights = Flight.objects.all()
    count = 0
    for flight in flights:
        booked_economic = Ticket.objects.filter(flight=flight, ticket_class='E', cancelled=False).count()
        booked_business = Ticket.objects.filter(flight=flight, ticket_class='B', cancelled=False).count()
        
        flight.available_economic_seats = flight.plane.economic_seats - booked_economic
        flight.available_business_seats = flight.plane.business_seats - booked_business
        flight.save(update_fields=['available_economic_seats', 'available_business_seats'])
        count += 1
    print(f"Updated {count} flights.")

def benchmark():
    print("\nBenchmarking...")
    
    flights_subset = list(Flight.objects.select_related('plane').all()[:50]) 
    if not flights_subset:
        print("No flights found to benchmark.")
        return

    print(f"Scenario 1: Displaying {len(flights_subset)} flights")
    print("Calculating 'available seats' for each flight to show to the user.")

    start_time = time.time()
    iterations_unopt = 5
    for _ in range(iterations_unopt):
        for flight in flights_subset:
            booked_economic = Ticket.objects.filter(flight=flight, ticket_class='E', cancelled=False).count()
            val = flight.plane.economic_seats - booked_economic
    end_time = time.time()
    unoptimized_time = (end_time - start_time) / iterations_unopt
    print(f"Unoptimized (SQL Count): {unoptimized_time:.4f} seconds per pass")

    start_time = time.time()
    iterations_opt = 1000
    for _ in range(iterations_opt):
        for flight in flights_subset:
            val = flight.available_economic_seats
    end_time = time.time()
    optimized_time = (end_time - start_time) / iterations_opt
    print(f"Optimized: {optimized_time:.6f} seconds per pass")
    
    if optimized_time > 0:
        print(f"Speedup: {unoptimized_time / optimized_time:.2f}x")


    print("\nScenario 2: Filtering/Searching")
    print("Finding all flights with available economic seats.")
    
    # Unoptimized Filtering
    # Without the field, we must fetch flights and check availability in Python (or use complex subqueries)
    start_time = time.time()
    # We only do 1 pass because it's very slow
    found_unopt = 0
    for flight in flights_subset:
        booked = Ticket.objects.filter(flight=flight, ticket_class='E', cancelled=False).count()
        if (flight.plane.economic_seats - booked) > 0:
            found_unopt += 1
    end_time = time.time()
    filter_unopt_time = end_time - start_time
    print(f"Unoptimized: {filter_unopt_time:.4f} seconds (for {len(flights_subset)} flights)")

    # Optimized Filtering
    # With the field, we can filter directly in the database
    start_time = time.time()
    filter_iterations = 100
    subset_ids = [f.id for f in flights_subset] # Restrict to same subset for fair comparison
    for _ in range(filter_iterations):
        qs = Flight.objects.filter(id__in=subset_ids, available_economic_seats__gt=0)
        found_opt = qs.count()
    end_time = time.time()
    filter_opt_time = (end_time - start_time) / filter_iterations
    print(f"Optimized: {filter_opt_time:.6f} seconds")

    if filter_opt_time > 0:
        print(f"Speedup: {filter_unopt_time / filter_opt_time:.2f}x")

if __name__ == '__main__':
    create_sample_data()
    populate()
    benchmark()