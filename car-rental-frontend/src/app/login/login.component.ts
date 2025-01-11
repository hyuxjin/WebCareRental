import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';  // Import ApiService
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule

@Component({
  selector: 'app-login',
  standalone: true,  // Marked as standalone
  imports: [ReactiveFormsModule],  // Import ReactiveFormsModule for forms
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';  // To store any error messages

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Call the login API service
      this.apiService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Store the authentication token or other user info if necessary
          localStorage.setItem('user', JSON.stringify(response));  // Store the entire response (including the user ID)

          // Navigate to the dashboard or home page after successful login
          this.router.navigate(['/cars']);
          
        },
        error: (error) => {
          console.error('Login failed', error);
          // Set the error message to show in the template
          this.errorMessage = error.error || 'Invalid credentials or server error.';
        }
      });
    }
  }
}
