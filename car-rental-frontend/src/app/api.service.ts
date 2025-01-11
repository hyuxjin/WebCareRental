import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5289/api';  // Keep the base URL

  constructor(private http: HttpClient) {}

  // Register user
  register(user: { name: string, email: string, passwordHash: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/account/register`, user).pipe(
      catchError(this.handleError)  // Handle errors
    );
  }

  // Login user
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/account/login`, { email, password }).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch available cars from backend
  getAvailableCars(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cars/available`).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch car details by ID
  getCarById(carId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cars/${carId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get car name by bookingId
  getCarNameByBookingId(bookingId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cars/${bookingId}`).pipe(  // Adjust URL as per your API
      catchError(this.handleError)
    );
  }

  // Create booking
  createBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/booking`, bookingData).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch user bookings
  getBookings(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/booking/user/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Book car
  bookCar(booking: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/booking`, booking).pipe(
      catchError(this.handleError)
    );
  }

  // Get booking details by ID
  getBookingDetails(bookingId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/booking/${bookingId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Method to process the payment
  processPayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/payment/process`, paymentData).pipe(
      catchError(this.handleError)
    );
  }

    // Method to get bookings for a specific user
    getBookingsByUser(userId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/booking/user/${userId}`); // Fetch bookings by user ID
    }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/account/users`).pipe(
      catchError(this.handleError)  // Error handling
    );
  }

  // Confirm booking
  confirmBooking(bookingId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/booking/confirm/${bookingId}`, {}).pipe(
      catchError(this.handleError)
    );
  }
  // Optionally, add a method to confirm payment details
  getPaymentDetails(bookingId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/payment/confirm/${bookingId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch all bookings
  getAllBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/booking`).pipe(
      catchError(this.handleError)
    );
  }


  // Common error handler function
  private handleError(error: any): Observable<never> {
    console.error('API request error:', error);
    return throwError(error);  // You could customize the error further here
  }
}
