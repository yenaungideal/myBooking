import { Routes } from '@angular/router';
import { authGuard, authorGuard } from '../../libs/gurad';
import { ProfileComponent } from './profile.component';

export const profileRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    component: ProfileComponent,
    canActivate: [authGuard, authorGuard],
  },
];
