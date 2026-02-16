import { Injectable, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { TRANSL_LANGS } from '../translation';

export type SupportedLanguage = 'en' | 'zh';

/**
 * Service to manage application language preferences
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
    private readonly translocoService = inject(TranslocoService);

    public readonly currentLanguage = signal<SupportedLanguage>('en');

    constructor() {
        this.setLanguage('en');
    }

    /**
     * Set the active language for the application
     * @param lang - Language code to set
     */
    public setLanguage(lang: SupportedLanguage): void {
        if (TRANSL_LANGS.includes(lang)) {
            this.translocoService.setActiveLang(lang);
            this.currentLanguage.set(lang);
        } else {
            // Fallback to English if invalid language is provided
            this.translocoService.setActiveLang('en');
            this.currentLanguage.set('en');
        }
    }

    /**
     * Get the currently active language
     */
    public getLanguage(): SupportedLanguage {
        return this.currentLanguage();
    }
}
