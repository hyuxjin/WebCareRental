import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  bookingId!: number;
  paymentMethod: string = 'gcash';  // Default payment method
  gcashNumber: string = '';
  cardNumber: string = '';
  expiryDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the booking ID from the route parameters
    this.route.params.subscribe((params) => {
      this.bookingId = +params['id']; // Convert the string to a number
    });
  }

  submitPayment(): void {
    const paymentData = {
      bookingId: this.bookingId,
      paymentMethod: this.paymentMethod,
      paymentDetails: this.paymentMethod === 'gcash' ? this.gcashNumber : {
        cardNumber: this.cardNumber,
        expiryDate: this.expiryDate
      },
    };

    this.apiService.processPayment(paymentData).subscribe({
      next: (response) => {
        console.log('API Response:', response);  // Log the response for debugging
        
        // Check if response status is successful
        if (response.status === 'success') {
          Swal.fire({
            title: 'Payment Successful!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Redirect to bookings after success
            this.router.navigate(['/bookings']);
          });
        } else {
          // Show error alert if status is not success
          Swal.fire({
            title: 'Payment Failed',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        }
      },
      error: (error) => {
        console.error('Error Processing Payment:', error); // Log any error received from API
        
        // Show error alert in case of an API error
        Swal.fire({
          title: 'Error Processing Payment',
          text: 'There was an error while processing your payment. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
  

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}