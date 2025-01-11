import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';    // Import MatButtonModule
import { MatIconModule } from '@angular/material/icon';        // Import MatIconModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewCarsComponent } from './view-cars/view-cars.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CarManagementComponent } from './admin/car-management/car-management.component';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { BookingComponent } from './booking/booking.component';
import { PaymentComponent } from './payment/payment.component';
import { BookingListsComponent } from './booking-lists/booking-lists.component';
import { ManageUsersComponent } from './manage-users/manage-users.component'; 


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PaymentComponent,
    ManageUsersComponent,
    BookingListsComponent,
    BrowserModule,
    UserBookingComponent,
    UserPaymentComponent,
    CarManagementComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    ViewCarsComponent,
    AppRoutingModule,
    DashboardComponent ,
    FormsModule,
    ReactiveFormsModule,  
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
