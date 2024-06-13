import { Component, output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  onRouteChanged = output<string>();
  isShowUserMenuButton = false;
  isShowMobileMenuButton = false;
  public onMenuClick(routePath: string) {
    this.onRouteChanged.emit(routePath);
  }
}
