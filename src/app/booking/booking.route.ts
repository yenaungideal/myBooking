import { Routes } from '@angular/router';
import { authGuard, authorGuard } from '../../libs/gurad';
import { BookingComponent } from './booking.component';

export const bookingRoutes: Routes = [
  {
    path: '',
    title: 'Booking',
    component: BookingComponent,
    canActivate: [authGuard, authorGuard],
    // canDeactivate: [unsavedModalGuard],
  },
];
