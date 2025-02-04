import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  public constructor(private sanitizer: DomSanitizer) {}

  public transform(value: string): SafeHtml {
    return value ? this.sanitizer.bypassSecurityTrustHtml(value) : '';
  }
}
