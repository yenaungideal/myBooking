import { Component, Inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Env } from '../../environments';
import { PermissionsService } from '../../libs/permission-checkers/permissions.service';
import { TranslateDirective } from '../../libs/translation';
import { IProductCard } from './product-card.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule, TranslateDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  public productCards = input<IProductCard[]>([
    {
      src: 'https://www.iamkarra.com/cdn/shop/files/CUBASE_TEMPLATE_3D_1.png?v=1741883926&width=300',
      alt: 'CUBASE_TEMPLATE_3D_1',
    },
  ]);

  public constructor(
    @Inject('ENVIRONMENT') protected ENVIRONMENT: Env,
    private permissionsService: PermissionsService
  ) {}
}
