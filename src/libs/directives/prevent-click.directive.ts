import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[preventClick]',
  standalone: true,
})
export class HaloPreventClickDirective {
  public constructor(private el: ElementRef) {}

  @HostListener('click', ['$event']) public onClick(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}
