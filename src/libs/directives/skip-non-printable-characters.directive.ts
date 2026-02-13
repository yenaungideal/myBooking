import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[skipNonPrintableCharacters]',
  standalone: true,
})
export class SkipNonPrintableCharactersDirective {
  @Input() public skipNonPrintableCharacters = false;
  public constructor(private element: ElementRef) {}

  @HostListener('input', ['$event'])
  public logChange(event: Event): void {
    if (!this.skipNonPrintableCharacters) return;
    const inputText = (event.target as HTMLInputElement).value;
    const regex = new RegExp(/[^\x20-\x7E]+/g, 'g');
    const sanitizedText = inputText.replace(regex, '');

    if (inputText !== sanitizedText) {
      this.element.nativeElement.value = '';
      this.element.nativeElement.value = sanitizedText;
    }
  }
}
