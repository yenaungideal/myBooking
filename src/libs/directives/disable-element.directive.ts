import {
  Directive,
  effect,
  ElementRef,
  HostListener,
  input,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[disableElement]',
})
export class DisableElementDirective {
  public disableElement = input.required<boolean>();
  public constructor(private elementRef: ElementRef<HTMLElement>) {
    effect(() => {
      const disabled = this.disableElement();
      this.disable(disabled);
    });
  }

  @HostListener('click', ['$event']) public onClick(event: MouseEvent): void {
    if (this.disableElement() && event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }

  private disable(v: boolean): void {
    this.elementRef.nativeElement.classList[v ? 'add' : 'remove'](
      'pointer-events-none',
      'opacity-30',
      'select-none'
    );
  }
}
