import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LOW_UPPER_REGEX } from './password-errors.constants';
import { PasswordValidatorsEnum } from './password-validators.enums';

export function specialCaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const containCases = LOW_UPPER_REGEX.test(control.value);
    return !containCases
      ? { [PasswordValidatorsEnum.specialCase]: true }
      : null;
  };
}
