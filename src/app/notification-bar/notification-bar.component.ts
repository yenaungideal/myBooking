import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Env } from '../../environments';
import { PermissionsService } from '../../libs/permission-checkers/permissions.service';

@Component({
  selector: 'app-notification-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './notification-bar.component.html',
  styleUrl: './notification-bar.component.scss',
})
export class NotificationBarComponent {
  isShowUserMenuButton = false;
  isShowMobileMenuButton = false;

  public constructor(
    @Inject('ENVIRONMENT') protected ENVIRONMENT: Env,
    private permissionsService: PermissionsService
  ) {}
}
