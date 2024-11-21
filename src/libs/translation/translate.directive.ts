import {
  Directive,
  ElementRef,
  inject,
  input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { HashMap, TranslocoService } from '@jsverse/transloco';
import { take } from 'rxjs';
import { trxFindMatch } from './find-match';
import { TranslocoHttpLoader } from './translate.loader';
import { TranslateService } from './translate.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[trx]', // The directive will be applied using the "trx" attribute in the HTML template.
  standalone: true,
})
export class TranslateDirective implements OnInit {
  public key = input.required<string>(); // The translation key input from the template
  public params = input<HashMap | undefined>(); // Parameters to be passed to the translation
  public inlineLang = input<string | undefined>(); // Inline language override (optional)
  private translocoService = inject(TranslocoService);
  private translateService = inject(TranslateService);
  private translocoHttpLoader = inject(TranslocoHttpLoader);
  private el: ElementRef;
  private renderer: Renderer2;

  constructor(el: ElementRef, renderer: Renderer2) {
    this.el = el;
    this.renderer = renderer;
  }

  public ngOnInit(): void {
    this.updateTranslation(); // Initial translation on directive initialization
  }

  private updateTranslation(): void {
    const currentLang = this.translateService.getActiveLang();
    const translationsMap = this.translateService.getTranslation();

    if (!translationsMap.size) {
      this.translocoHttpLoader
        .getTranslation(currentLang)
        .pipe(take(1))
        .subscribe((translations) => {
          this.translateService.setTranslation(translations);
          this.applyTranslation(); // After loading translations, apply them
        });
    } else {
      this.applyTranslation();
    }
  }

  private applyTranslation(): void {
    const currentLang = this.translocoService.getActiveLang();
    const translationsMap = this.translocoService.getTranslation();
    if (translationsMap.size) {
      const translationObj = translationsMap.get(currentLang);
      const fullKey = Object.keys(translationObj || {}).find((k) =>
        trxFindMatch(k, this.key() ?? '')
      );

      // Set the translated value as the text content of the element
      const translatedValue = this.translateService.instant(
        fullKey || this.key()
      );
      console.log('---translatedValue---', translatedValue);

      this.renderer.setProperty(
        this.el.nativeElement,
        'innerText',
        translatedValue
      ); // Set the translation on the element
    }
  }
}
