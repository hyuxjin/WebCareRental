import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: any; // Define 'user' here
  
  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}'); // Parse from localStorage
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
}
