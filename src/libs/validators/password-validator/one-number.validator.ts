import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ONE_NUM_REGEX } from './password-errors.constants';
import { PasswordValidatorsEnum } from './password-validators.enums';

export function oneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const containNumber = ONE_NUM_REGEX.test(control.value);
    return !containNumber
      ? { [PasswordValidatorsEnum.needNumber]: true }
      : null;
  };
}
