import { Component, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { MatButton } from '@angular/material/button';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButton, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  public isShowNavBar = false;
  private destroy$ = new Subject<void>();
  constructor(private router: Router, private route: ActivatedRoute) {
    router.events.pipe(takeUntil(this.destroy$)).subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // * NavigationEnd: When navigation ends successfully.
        if (event.url !== '/login' && event.url !== '/logout' && event.url !== '/') {
          this.isShowNavBar = true;
        } else {
          this.isShowNavBar = false;
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Emit a value and complete the observable to clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
}
