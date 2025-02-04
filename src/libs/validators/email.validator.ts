import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const EMAIL_REGEX =
  /^(?=[a-zA-Z0-9\\+@.-]{1,64}$)[a-zA-Z0-9]+(?:[.+-][a-zA-Z0-9]+)\+?[a-zA-Z0-9]@[a-zA-Z0-9]+([-._][a-zA-Z0-9]+)*\.[a-zA-Z0-9]{2,12}$/;

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value?.length === 0) return null;
    const matches = EMAIL_REGEX.exec(control.value);
    return !(matches?.length && matches.length > 0) ? { email: true } : null;
  };
}
