import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'dashboard', title: 'Dashboard', component: DashboardComponent },
  { path: 'booking', title: 'Booking', component: BookingComponent },
  { path: 'profile', title: 'Profile', component: ProfileComponent },
  { path: '**', component: DashboardComponent }, // Wildcard route for a 404 page
];
