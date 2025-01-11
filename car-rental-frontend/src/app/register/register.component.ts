import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { Router } from '@angular/router';  // Import Router
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-register',
  standalone: true,  // Marked as standalone
  imports: [ReactiveFormsModule, CommonModule],  // Import CommonModule for `*ngIf`
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';  // To store error messages
  successMessage: string = '';  // To store success messages

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {  // Inject Router here
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatcher
    });
  }

  passwordMatcher(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  navigateToLogin() {
    this.router.navigate(['/login']);  // Navigate to login using the Router
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      const user = { name, email, passwordHash: password }; // Use passwordHash for consistency with your API

      // Call the register API service
      this.apiService.register(user).subscribe({
        next: (response) => {
          console.log('Registration successful', response);

          // Show SweetAlert success message
          Swal.fire({
            title: 'Success!',
            text: 'Registration successful! You can now log in.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Optionally navigate to login page after successful registration
            this.router.navigate(['/login']);
          });
        },
        error: (error) => {
          console.error('Registration failed', error);

          // Show SweetAlert error message
          Swal.fire({
            title: 'Error!',
            text: error.error || 'Registration failed. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }
}
