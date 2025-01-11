import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Import Router
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-lists',
  standalone: true,
  templateUrl: './booking-lists.component.html',
  styleUrls: ['./booking-lists.component.css'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class BookingListsComponent implements OnInit {
  bookings: any[] = [];
  router: Router;  // Declare router

  constructor(private apiService: ApiService, router: Router) {
    this.router = router;  // Inject the Router into the component
  }

  ngOnInit(): void {
    this.loadBookings();
  }

  navigateTo(route: string) {
    if (this.router) {
      this.router.navigate([`/${route}`]);
    }
  }

  logout() {
    if (this.router) {
      localStorage.removeItem('user');
      this.router.navigate(['/admin-login']);
    }
  }

  loadBookings(): void {
    this.apiService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data; // Ensure the bookings data contains the updated 'Accepted' and 'Paid' states
        console.log('Bookings data:', this.bookings); // Logs all booking data for inspection
        
        // Optionally log each booking's individual Accepted and Paid status for clarity
        this.bookings.forEach(booking => {
          console.log(`Booking ID: ${booking.id}, Accepted: ${booking.accepted}, Paid: ${booking.isPaid}`);
        });
      },
      error: (err) => {
        console.error('Error loading bookings', err);
      },
    });
  }
  

  confirmBooking(bookingId: number): void {
    // Show a confirmation dialog using SweetAlert
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to confirm this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the API to confirm the booking
        this.apiService.confirmBooking(bookingId).subscribe({
          next: (updatedBooking) => {
            const booking = this.bookings.find(b => b.id === bookingId);
            if (booking) {
              booking.accepted = true;  // Update the booking state on the frontend
              Swal.fire('Confirmed!', 'Booking has been confirmed.', 'success');
            }
          },
          error: (err) => {
            console.error('Error confirming booking', err);
            Swal.fire('Error!', 'There was an error confirming the booking.', 'error');
          },
        });
      }
    });
  }
  
  
}
