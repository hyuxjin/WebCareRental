import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-booking',
  standalone: true,
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class UserBookingComponent implements OnInit {
  selectedCar: any = {};
  startDate: Date | null = null;
  endDate: Date | null = null;
  bookingDetails: any;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['carId']) {
        this.fetchCarDetails(params['carId']);
      }
    });
  }

  fetchCarDetails(carId: number): void {
    this.apiService.getCarById(carId).subscribe({
      next: (response) => {
        this.selectedCar = response;
      },
      error: (error) => {
        console.error('Error fetching car details', error);
      },
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  proceedToPayment(): void {
    const userId = this.getUserId();
    
    const booking = {
      carId: this.selectedCar.id,
      userId: userId,
      startDate: this.startDate,
      endDate: this.endDate,
      totalAmount: this.calculateTotalAmount(),
      isPaid: false
    };
  
    this.apiService.bookCar(booking).subscribe({
      next: (response) => {
        console.log('Booking successful', response);
        localStorage.setItem('bookingId', response.id);  // Save the booking ID in local storage
        this.router.navigate(['/payment', response.id]); 
      },
      error: (error) => {
        console.error('Booking failed', error);
      }
    });
  }
  
  
  
  calculateTotalAmount(): number {
    if (!this.startDate || !this.endDate) {
      return 0; // Return 0 if the dates are not set
    }
  
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
  
    // Ensure that the start and end dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 0; // Return 0 if the dates are invalid
    }
  
    const timeDiff = end.getTime() - start.getTime();
    const days = timeDiff / (1000 * 3600 * 24);
  
    return this.selectedCar.pricePerDay * days; // Calculate the total amount based on the days
  }
  
  getUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id || 0;  // Use optional chaining for safer access
  }

  goBack(): void {
    this.router.navigate(['/cars']);
  }
}
