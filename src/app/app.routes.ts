import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'home', title: 'Home', component: HomeComponent },
  { path: 'dashboard', title: 'Dashboard', component: DashboardComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: '**', component: HomeComponent }, // Wildcard route for a 404 page
];
