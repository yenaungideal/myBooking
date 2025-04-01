import {
  Directive,
  effect,
  ElementRef,
  HostListener,
  input,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[disableView]',
})
export class DisableViewDirective {
  public disableView = input.required<boolean>();
  public constructor(private elementRef: ElementRef<HTMLElement>) {
    effect(() => {
      const disabled = this.disableView();
      this.disable(disabled);
    });
  }

  @HostListener('click', ['$event']) public onClick(event: MouseEvent): void {
    if (this.disableView() && event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }

  private disable(v: boolean): void {
    this.elementRef.nativeElement.classList[v ? 'add' : 'remove'](
      'pointer-events-none',
      'opacity-30',
      'select-none',
      'inline-flex'
    );
  }
}
