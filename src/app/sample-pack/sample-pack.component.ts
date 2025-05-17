import { Component, Inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Env } from '../../environments';
import { PermissionsService } from '../../libs/permission-checkers/permissions.service';
import { TranslateDirective } from '../../libs/translation';
import { ProductCardComponent } from '../product-card/product-card.component';
import { IProductCard } from '../product-card/product-card.interface';

@Component({
  selector: 'app-sample-pack',
  standalone: true,
  imports: [RouterModule, ProductCardComponent, TranslateDirective],
  templateUrl: './sample-pack.component.html',
  styleUrl: './sample-pack.component.scss',
})
export class SamplePackComponent {
  isShowUserMenuButton = false;
  isShowMobileMenuButton = false;
  public productCards = signal<IProductCard[]>([
    {
      src: 'https://www.iamkarra.com/cdn/shop/files/KARRAVOCALS13D1.png?v=1741890871&width=1200',
      alt: 'KARRAVOCALS13D1',
    },
    {
      src: 'https://www.iamkarra.com/cdn/shop/files/EASYANTHEMVOCALS13D.png?v=1743304556&width=1200',
      alt: 'EASYANTHEMVOCALS13D',
    },
    {
      src: 'https://www.iamkarra.com/cdn/shop/files/EASYBUNDLE3D.png?v=1743308581&width=1200',
      alt: 'EASYBUNDLE3D',
    },
  ]);

  public constructor(
    @Inject('ENVIRONMENT') protected ENVIRONMENT: Env,
    private permissionsService: PermissionsService
  ) {}
}
