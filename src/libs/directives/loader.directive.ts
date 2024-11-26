import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
} from '@angular/core';

import { LoaderService } from '../services';
import { LoaderNames } from '../types/loader-names.enum';
import { ILoaderModel } from '../types/loader.model';
import { InfiniteLoaderComponent } from '../widgets/infinite-loader/infinite-loader.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[loader]',
  standalone: true,
})
export class LoaderDirective implements OnDestroy {
  public loader = input.required<LoaderNames>();
  private isAttached = false;
  private overlayRef!: OverlayRef;

  private readonly loaderService = inject(LoaderService);
  private readonly elementRef = inject(ElementRef);
  private readonly overlay = inject(Overlay);

  public constructor() {
    effect(() => this.loaderChangeHandler());
  }

  public ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }

  private createOverlayConfig(loader: ILoaderModel): void {
    const height = (this.elementRef.nativeElement?.clientHeight / 3) * 2;
    this.overlayRef = this.overlay.create({
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPush(false)
        .withPositions([
          {
            originX: loader.position,
            originY: 'center',
            overlayX: loader.position,
            overlayY: 'center',
          },
        ]),
      hasBackdrop: loader.hasBackdrop,
      panelClass: 'z-50',
      height: height,
      width: height,
    });
  }

  private loaderChangeHandler(): void {
    const loader = this.loaderService.loader();
    if (!loader || loader.name !== this.loader()) return;

    if (loader.isLoading) {
      if (!this.overlayRef) this.createOverlayConfig(loader);
      if (!this.isAttached)
        this.overlayRef.attach(new ComponentPortal(InfiniteLoaderComponent));
      this.isAttached = true;
    } else {
      this.overlayRef?.detach();
      this.isAttached = false;
    }

    if (this.elementRef?.nativeElement) {
      this.elementRef.nativeElement.disabled = loader.disableElement;
      if (this.elementRef.nativeElement.firstElementChild)
        this.elementRef.nativeElement.firstElementChild.disabled =
          loader.disableElement;
    }
  }
}
