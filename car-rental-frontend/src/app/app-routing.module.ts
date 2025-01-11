import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ViewCarsComponent } from './view-cars/view-cars.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CarManagementComponent } from './admin/car-management/car-management.component';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { BookingComponent } from './booking/booking.component';
import { PaymentComponent } from './payment/payment.component';
import { BookingListsComponent } from './booking-lists/booking-lists.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'bookings', component: BookingComponent, canActivate: [AuthGuard] }, 
  { path: 'admin-login', component: AdminLoginComponent }, 
  { path: 'user-lists', component: ManageUsersComponent, canActivate: [AuthGuard] }, 
  { path: 'booking-lists', component: BookingListsComponent, canActivate: [AuthGuard] }, 
  { path: 'user-booking', component: UserBookingComponent, canActivate: [AuthGuard] }, 
  { path: 'user-payment', component: UserPaymentComponent, canActivate: [AuthGuard] }, 
  { path: 'payment/:id', component: PaymentComponent, canActivate: [AuthGuard] }, 
  { path: 'car-manage', component: CarManagementComponent, canActivate: [AuthGuard] }, 
  { path: 'adDashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'cars', component: ViewCarsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
