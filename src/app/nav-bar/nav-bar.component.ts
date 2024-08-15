import { Component, Inject, OnInit, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IMenuItem, NAV_MENU } from './nav-bar.config';
import { Env } from '../../environments';
import { TranslocoService } from '@ngneat/transloco';
import { PermissionsService } from '../../libs/permission-checkers/permissions.service';
import { TranslatePipe } from '../../libs/translation';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule,TranslatePipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  isShowUserMenuButton = false;
  isShowMobileMenuButton = false;
  protected readonly navMenu = NAV_MENU;

  public constructor(
    @Inject('ENVIRONMENT') protected ENVIRONMENT: Env,
    private translocoService: TranslocoService,
    private permissionsService: PermissionsService
  ){
  }

  public ngOnInit(): void {
    this.navMenu.forEach((menu) => menu.enabled = this.setMenuState(menu));
    console.log('---navMenu---',this.navMenu);
  }

  private setMenuState(menu: IMenuItem):boolean{
    return this.permissionsService.routeHasPermission(menu.route);
  }
}
