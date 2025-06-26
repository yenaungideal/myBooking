import { Component, Inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Env } from '../../environments';
import { PermissionsService } from '../../libs/permission-checkers/permissions.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { IProductCard } from '../product-card/product-card.interface';

@Component({
  selector: 'app-mixing-template',
  standalone: true,
  imports: [RouterModule, ProductCardComponent],
  templateUrl: './mixing-template.component.html',
  styleUrl: './mixing-template.component.scss',
})
export class MixingTemplateComponent {
  isShowUserMenuButton = false;
  isShowMobileMenuButton = false;
  public productCards = signal<IProductCard[]>([
    {
      src: 'https://www.iamkarra.com/cdn/shop/files/CUBASE_TEMPLATE_3D_1.png?v=1741883926&width=300',
      alt: 'CUBASE_TEMPLATE_3D_1',
    },
    {
      src: 'https://www.iamkarra.com/cdn/shop/files/STUDIO_ONE_TEMPLATE_3D_2.png?v=1741883258&width=300',
      alt: 'studio_one_template',
    },
    {
      src: 'https://www.iamkarra.com/cdn/shop/files/PRO_TOOLS_TEMPLATE_3D_1.png?v=1741905645&width=300',
      alt: 'pro_tool_template',
    },
    {
      src: 'https://www.iamkarra.com/cdn/shop/files/FL_STUDIO_TEMPLATE_3D_1.png?v=1741882835&width=300',
      alt: 'fl_template',
    },
    {
      src: 'https://www.iamkarra.com/cdn/shop/files/ABLETON_TEMPLATE_3D_3.png?v=1741882758&width=300',
      alt: 'ableton_template',
    },
    {
      src: 'https://www.iamkarra.com/cdn/shop/files/LOGIC_TEMPLATE_3D_2.png?v=1741882679&width=300',
      alt: 'logic_template',
    },
  ]);

  public constructor(
    @Inject('ENVIRONMENT') protected ENVIRONMENT: Env,
    private permissionsService: PermissionsService
  ) {}
}
