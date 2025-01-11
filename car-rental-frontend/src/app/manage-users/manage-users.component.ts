import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';  // Adjust the path if needed
import { Router } from '@angular/router';  // Import Router
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];  // Array to hold the list of users
  error: string = '';  // For handling errors

  constructor(private apiService: ApiService, private router: Router) {}  // Inject Router here

  ngOnInit(): void {
    this.loadUsers();  // Load the users when the component is initialized
  }

  // Navigate to a specific route
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  // Logout the user and redirect to login
  logout() {
    localStorage.removeItem('user'); // Clear user data
    this.router.navigate(['/login']); // Redirect to login
  }

  loadUsers(): void {
    this.apiService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;  // Assign the response data to the users array
      },
      error: (err) => {
        console.error('Error loading users', err);
        this.error = 'Failed to load users. Please try again later.';  // Show error message
      }
    });
  }
}
