import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MIN_MAX_REGEX } from './password-errors.constants';
import { PasswordValidatorsEnum } from './password-validators.enums';

export function combinedMinMaxValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isContainMinMax = MIN_MAX_REGEX.test(control.value);
    return !isContainMinMax ? { [PasswordValidatorsEnum.minMax]: true } : null;
  };
}
