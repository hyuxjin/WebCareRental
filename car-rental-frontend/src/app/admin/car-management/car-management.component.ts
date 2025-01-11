import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-management',
  standalone: true,
  templateUrl: './car-management.component.html',
  styleUrls: ['./car-management.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CarManagementComponent implements OnInit {
  cars: any[] = [];
  carForm!: FormGroup;
  selectedCar: any = null;
  isModalOpen: boolean = false;
  router: any;
  user: any;

  constructor(private carService: CarService, private fb: FormBuilder, private _router: Router) {
    this.router = _router;
  }

  ngOnInit(): void {
    this.fetchCars();
    this.initializeForm();
  }

  navigateTo(route: string) {
    if (this.router) {
      this.router.navigate([`/${route}`]);
    }
  }

  logout() {
    if (this.router) {
      localStorage.removeItem('user');
      this.router.navigate(['/admin-login']);
    }
  }

  initializeForm() {
    this.carForm = this.fb.group({
      id: [''],
      name: [''],
      model: [''],
      pricePerHour: [''],
      pricePerDay: [''],
      status: ['Available']
    });
  }

  fetchCars() {
    this.carService.getCars().subscribe({
      next: (response) => {
        this.cars = response;
      },
      error: (error) => {
        console.error('Error fetching cars', error);
      }
    });
  }

  saveCar() {
    const formValue = this.carForm.value;

    if (this.selectedCar) {
      // Edit existing car
      const updatedCarData = {
        ...this.selectedCar,
        ...formValue,
        isAvailable: formValue.status === 'Available'
      };

      this.carService.updateCar(updatedCarData).subscribe({
        next: (response) => {
          console.log('Car updated successfully', response);
          this.fetchCars();  // Reload cars after update
          this.closeModal();
          
          // Show SweetAlert success message
          Swal.fire('Success!', 'Car updated successfully!', 'success');
        },
        error: (error) => {
          console.error('Error updating car', error);
          
          // Show SweetAlert error message
          Swal.fire('Error!', 'There was an error updating the car.', 'error');
        }
      });

    } else {
      // Add new car
      const newCarData = {
        name: formValue.name,
        model: formValue.model,
        pricePerHour: formValue.pricePerHour,
        pricePerDay: formValue.pricePerDay,
        isAvailable: formValue.status === 'Available'
      };

      this.carService.addCar(newCarData).subscribe({
        next: (response) => {
          console.log('Car added successfully', response);
          this.fetchCars();  // Reload cars after adding
          this.closeModal();
          
          // Show SweetAlert success message
          Swal.fire('Success!', 'New car added successfully!', 'success');
        },
        error: (error) => {
          console.error('Error adding car', error);
          
          // Show SweetAlert error message
          Swal.fire('Error!', 'There was an error adding the car.', 'error');
        }
      });
    }
  }

  editCar(car: any) {
    this.selectedCar = car;
    this.carForm.patchValue(car); // Patches the form with the selected car data
    this.openModal();
  }

  deleteCar(carId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this car?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carService.deleteCar(carId).subscribe({
          next: () => {
            this.fetchCars();
            Swal.fire('Deleted!', 'Car has been deleted.', 'success');
          },
          error: (error) => {
            console.error('Error deleting car', error);
            Swal.fire('Error!', 'There was an error deleting the car.', 'error');
          },
        });
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  resetForm() {
    this.carForm.reset();
    this.selectedCar = null;
  }
}
