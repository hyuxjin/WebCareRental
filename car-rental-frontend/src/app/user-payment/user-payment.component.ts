import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-user-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent {
  bookingDetails: any = {}; // Ensure bookingDetails is defined
  carName: string = ''; // To hold the car name

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router // Inject Router here
  ) {}

  ngOnInit(): void {
    const bookingId = localStorage.getItem('bookingId');
  
    if (bookingId) {
      this.apiService.getBookingDetails(bookingId).subscribe({
        next: (response) => {
          console.log('Booking Details Response:', response);
          this.bookingDetails = response;
          
          // After fetching booking details, get the car name based on carId
          this.getCarName(this.bookingDetails.carId);
        },
        error: (error) => {
          console.error('Error fetching booking details', error);
        }
      });
    }
  }

  // Navigate to a specific route
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]); // Use router to navigate
  }

  // Logout the user and redirect to login
  logout() {
    localStorage.removeItem('user'); // Clear user data
    this.router.navigate(['/login']); // Redirect to login
  }

  // Function to fetch the car name based on carId
  getCarName(carId: number): void {
    this.apiService.getCarNameByBookingId(carId).subscribe({
      next: (response) => {
        console.log('Car Name:', response); // Check what the response contains in the console
        if (response && response.name) {
          this.carName = response.name; // Correctly store the car name
        } else {
          this.carName = 'Unknown Car'; // Fallback in case the name is not available
        }
      },
      error: (error) => {
        console.error('Error fetching car name', error);
      }
    });
  }
}
