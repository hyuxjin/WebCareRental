import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';  // Import ApiService
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],  // Import ReactiveFormsModule for forms
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';  // To store any error messages

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.loginForm = this.fb.group({  
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Call the login API service
      this.apiService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);

          // Store the authentication token or other user info if necessary
          localStorage.setItem('user', JSON.stringify(response));

          // Show SweetAlert success message
          Swal.fire({
            title: 'Success!',
            text: 'Login successful.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Navigate to the dashboard or home page after successful login
            this.router.navigate(['/car-manage']);
          });
        },
        error: (error) => {
          console.error('Login failed', error);
          // Set the error message to show in the template
          this.errorMessage = error.error || 'Invalid credentials or server error.';
          
          // Show SweetAlert error message
          Swal.fire({
            title: 'Error!',
            text: this.errorMessage,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }
}
