import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  imports: [CommonModule],  // Import CommonModule here
})
export class BookingComponent {
  bookings: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user'); 
    console.log('User data from localStorage:', userData); // Log the user data from localStorage

    if (userData) {
      const user = JSON.parse(userData);
      const userId = user.id; // Get the userId from the response
      console.log('User ID:', userId);  // Log the user ID

      // Fetch bookings for the user
      this.apiService.getBookingsByUser(userId).subscribe({
        next: (response) => {
          console.log('User Bookings:', response); // Log all the bookings fetched
          this.bookings = response; // Assign response to bookings array

          // Log bookings after assignment
          console.log('Bookings after assignment:', this.bookings);

          // For each booking, fetch the car name based on carId
          this.bookings.forEach((booking, index) => {
            console.log(`Fetching car name for booking ${index + 1}`, booking); // Log the current booking before fetching car name
            this.getCarName(booking.carId, booking); // Fetch car name for each booking
          });
        },
        error: (error) => {
          console.error('Error fetching bookings', error);
        }
      });
    } else {
      console.log('No user data found in localStorage');
    }
  }

  // Function to get car name using carId
  getCarName(carId: number, booking: any): void {
    console.log('Fetching car name for carId:', carId);  // Log carId before fetching
    this.apiService.getCarNameByBookingId(carId).subscribe({
      next: (response) => {
        console.log('Car Name for carId', carId, ':', response); // Log the response for car name
        if (response && response.name) {
          booking.carName = response.name; // Set the carName for the booking
        } else {
          booking.carName = 'Unknown Car'; // Default name if not found
        }

        // Log updated booking with car name
        console.log('Updated booking with car name:', booking);
      },
      error: (error) => {
        console.error('Error fetching car name', error);
      }
    });
  }

  navigateToPayment(booking: any): void {
    console.log('Navigating to payment for booking:', booking); // Log booking info before navigating
    this.router.navigate(['/payment', booking.id]);
  }

  navigateTo(route: string) {
    console.log('Navigating to route:', route); // Log route before navigating
    this.router.navigate([`/${route}`]);
  }

  logout() {
    console.log('Logging out and clearing user data');  // Log before logging out
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
