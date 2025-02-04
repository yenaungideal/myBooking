import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const defaultRegex = /^[a-zA-Z0-9!()\-.?[\]_\s`~;/\\:,"'!@#$%^&*=+-]+$/;

export const allowedSpecialCharactersValidator = (
  errorMessage: string,
  regex?: RegExp
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const usedRegex = regex ?? defaultRegex;
    const result = usedRegex.test(control.value);

    if (control.value && !result) {
      return { customError: errorMessage };
    }

    return null;
  };
};
