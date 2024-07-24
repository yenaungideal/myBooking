import { Directive, HostListener, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[skipWhitespace]',
  standalone: true
})
export class SkipWhitespaceDirective {
  @Input() public skipWhitespace = true;

  public constructor(@Optional() @Self() private ngControl: NgControl) {}

  @HostListener('keyup', ['$event'])
  public onKeyup(event: KeyboardEvent): void {
    if (!this.skipWhitespace) return;

    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (event.key === ' ') {
      value = value.replace(/\s/g, '');
      input.value = value;

      this.ngControl?.control?.patchValue(value, { emitEvent: false });
    }
  }
}