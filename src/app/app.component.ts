import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivationEnd,
  ActivationStart,
  ChildActivationEnd,
  ChildActivationStart,
  Event,
  GuardsCheckEnd,
  GuardsCheckStart,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  ResolveEnd,
  ResolveStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterOutlet,
  RoutesRecognized,
  Scroll,
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
        if (event.url !== '/login') {
          this.isShowNavBar = true;
        } else {
          this.isShowNavBar = false;
        }
      }
    });
  }

  public onRouteChanged(routePath: string) {
    this.router.navigate([routePath]);
  }

  ngOnDestroy(): void {
    // Emit a value and complete the observable to clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
}
