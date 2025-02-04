import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe to transform a number into a string with the appropriate singular or plural text.
 *
 * @example
 * {{ 1 | pluralSingular:'apple' }} // Outputs "1 apple"
 * {{ 3 | pluralSingular:'apple' }} // Outputs "3 apples"
 * {{ 2 | pluralSingular:'goose':'geese' }} // Outputs "2 geese"
 *
 * @remarks
 * This pipe can be used for simple pluralization where the plural form is typically just adding an 's' at the end of the singular form.
 * In cases where the plural form is different (like 'goose' and 'geese'), both singular and plural forms need to be provided.
 *
 */
@Pipe({
  name: 'pluralSingular',
  standalone: true,
})
export class PluralSingularPipe implements PipeTransform {
  /**
   * A pipe to transform a number into a string with the appropriate singular or plural text.
   *
   * @param number The number to determine if singular or plural text should be used.
   * @param singularText The text to use for singular form.
   * @param pluralText Optional. The text to use for plural form. Defaults to adding an 's' to the singular text.
   * @returns A string combining the number and the correct form of the provided text.
   */
  public transform(
    number: number,
    singularText: string,
    pluralText: string
  ): string {
    return `${number} ${number === 1 ? singularText : pluralText}`;
  }
}
