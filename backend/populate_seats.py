import os
import sys
import time
import django
from django.db import connection, reset_queries

# Add backend to sys.path so we can import from it
sys.path.append(os.path.join(os.getcwd(), 'backend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'QAirline.settings')
django.setup()

from flights.models import Flight, Ticket

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
    flights = list(Flight.objects.select_related('plane').all()[:100]) 
    if not flights:
        print("No flights found to benchmark.")
        return

    print(f"Benchmarking with {len(flights)} flights, 100 iterations.")

    # Benchmark Unoptimized (Calculation)
    # booked_economic = Ticket.objects.filter(flight=self, ticket_class='E', cancelled=False).count()
    # return self.plane.economic_seats - booked_economic
    
    start_time = time.time()
    
    for _ in range(10):
        for flight in flights:
            booked_economic = Ticket.objects.filter(flight=flight, ticket_class='E', cancelled=False).count()
            val = flight.plane.economic_seats - booked_economic
    end_time = time.time()
    unoptimized_time = (end_time - start_time) * 10
    print(f"Unoptimized (Calculation) estimated time for 100 iterations: {unoptimized_time:.4f} seconds")

    # Benchmark Optimized (Field Access)
    start_time = time.time()
    for _ in range(100):
        for flight in flights:
            val = flight.available_economic_seats
    end_time = time.time()
    optimized_time = end_time - start_time
    print(f"Optimized (Field Access) time for 100 iterations: {optimized_time:.4f} seconds")
    
    if optimized_time > 0:
        print(f"Speedup: {unoptimized_time / optimized_time:.2f}x")

if __name__ == '__main__':
    populate()
    benchmark()