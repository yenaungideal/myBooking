import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Env } from '../../environments';
import { PermissionsService } from '../../libs/permission-checkers/permissions.service';
import { TranslateDirective } from '../../libs/translation';
import { IMenuItem, NAV_MENU } from './nav-bar.config';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, TranslateDirective],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  public isShowUserMenuButton = false;
  public isShowMobileMenuButton = false;
  protected readonly navMenu = NAV_MENU;

  public constructor(
    @Inject('ENVIRONMENT') protected ENVIRONMENT: Env,
    private permissionsService: PermissionsService
  ) { }

  public ngOnInit(): void {
    this.navMenu.forEach((menu) => (menu.enabled = this.setMenuState(menu)));
  }

  private setMenuState(menu: IMenuItem): boolean {
    return this.permissionsService.routeHasPermission(menu.route);
  }
}
