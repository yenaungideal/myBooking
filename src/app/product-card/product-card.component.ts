import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProductCard } from './product-card.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  public readonly productCards = input<IProductCard[]>([
    {
      src: 'https://www.iamkarra.com/cdn/shop/files/CUBASE_TEMPLATE_3D_1.png?v=1741883926&width=300',
      alt: 'CUBASE_TEMPLATE_3D_1',
    },
  ]);
}
