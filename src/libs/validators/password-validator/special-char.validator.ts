import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SPECIAL_CHAR_REGEX } from './password-errors.constants';
import { PasswordValidatorsEnum } from './password-validators.enums';

export function specialCharValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isContainSpecial = SPECIAL_CHAR_REGEX.test(control.value);
    return !isContainSpecial
      ? { [PasswordValidatorsEnum.specialChar]: true }
      : null;
  };
}
