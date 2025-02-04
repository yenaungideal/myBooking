import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

/**
 * A standalone pipe that formats a given date. If the date is today, it returns 'Today'.
 * Otherwise, it formats the date according to the specified format, timezone, and locale.
 * It leverages Angular's DatePipe for date formatting when the date is not the current day.
 *
 * @Pipe {name: 'dateToday', standalone: true} Decorator to define a new pipe named 'dateToday'.
 * @class DateTodayPipe The class implementing the PipeTransform interface.
 */
@Pipe({
  name: 'dateToday',
  standalone: true,
})
export class DateTodayPipe implements PipeTransform {
  public constructor(
    @Inject(LOCALE_ID) private locale: string,
    private translocoService: TranslocoService
  ) {}

  /**
   * Transforms the input value into a formatted date string or 'Today' if the input date is the current date.
   *
   * @param {string | number | Date | null | undefined} value The date value to be transformed.
   * Can be a string, number, Date object, or null/undefined.
   * @param {string} [format='MMM d, y'] The date format pattern. Defaults to 'MMM d, y'.
   * @param {string} [timezone] Optional. The timezone name or abbreviation.
   * @param {string} [locale] Optional. The locale to use for formatting the date,
   * overriding the injected LOCALE_ID if provided.
   * @returns {string | null} The formatted date string or 'Today' if the input date is the current date.
   * Returns null if the input value is null or undefined.
   */
  public transform(
    value: string | number | Date | null | undefined,
    format = 'MMM d, y',
    timezone?: string,
    locale?: string
  ): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(value);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate.getTime() === today.getTime()) {
      return this.translocoService.translate('trxCommon.today');
    } else {
      const datePipe = new DatePipe(locale || this.locale);
      return datePipe.transform(value, format, timezone, locale);
    }
  }
}
