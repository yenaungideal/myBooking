import {
  ChangeDetectorRef,
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  effect,
  input,
} from '@angular/core';
import { PermissionsService } from './permissions.service';
import { IPermissionsConfig } from './permissions.interface';

@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasPermissions]',
})
export class HasPermissionsDirective {
  hasPermissions = input<IPermissionsConfig>();

  public constructor(
    private templateRef: TemplateRef<unknown>,
    private vcr: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private permissionsService: PermissionsService
  ) {
    effect(() => {
      const permissions = this.hasPermissions();
      this.handleRendering(this.permissionsService.hasPermissions(permissions));
    });
  }

  private handleRendering(isPassed: boolean): void {
    if (isPassed) {
      this.vcr.createEmbeddedView(this.templateRef);
    } else {
      this.vcr.clear();
    }
    this.cdr.detectChanges();
  }
}
