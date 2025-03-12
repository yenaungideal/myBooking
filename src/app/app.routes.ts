import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // redirect to `first-component`
  {
    path: 'login',
    title: 'Login',
    loadChildren: () =>
      import('./login/login.route').then((r) => r.loginRoutes),
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.route').then((r) => r.dashboardRoutes),
  },
  {
    path: 'booking',
    title: 'Booking',
    loadChildren: () =>
      import('./booking/booking.route').then((r) => r.bookingRoutes),
  },
  {
    path: 'profile',
    title: 'Profile',
    loadChildren: () =>
      import('./profile/profile.route').then((r) => r.profileRoutes),
  },
  { path: 'logout', redirectTo: '/login' },
  { path: '**', redirectTo: '/dashboard' }, // Wildcard route for a 404 page
];
