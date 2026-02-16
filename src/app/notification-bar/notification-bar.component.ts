import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notification-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './notification-bar.component.html',
  styleUrl: './notification-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationBarComponent { }
