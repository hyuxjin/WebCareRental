import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';  // Import the ApiService
import { Router } from '@angular/router';  // Import Router
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-cars',
  standalone: true,
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class ViewCarsComponent implements OnInit {
  cars: any[] = [];  // Store fetched cars

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCars();  // Fetch the cars when the component initializes
  }

  fetchCars() {
    this.apiService.getAvailableCars().subscribe({
      next: (response) => {
        this.cars = response;  // Store the fetched cars
      },
      error: (error) => {
        console.error('Error fetching cars', error);
      }
    });
  }

  // Navigate to a specific route
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  // Logout the user and redirect to login
  logout() {
    localStorage.removeItem('user');  // Clear user data
    this.router.navigate(['/login']);  // Redirect to login
  }

  // Method to navigate to user-booking and pass the selected car's ID
  bookCar(car: any) {
    this.router.navigate(['/user-booking'], { queryParams: { carId: car.id } });
  }
}
