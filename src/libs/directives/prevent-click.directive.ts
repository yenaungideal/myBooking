import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[haloPreventClick]',
  standalone: true
})
export class HaloPreventClickDirective {
  public constructor(private el: ElementRef) {}

  @HostListener('click', ['$event']) public onClick(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}