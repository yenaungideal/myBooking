import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const MIN_MAX_REGEX_8_20 = /^(?=.*).{8,20}$/;
const ONLY_DIGITS_REGEX = /^[0-9]*$/;

const REGEXEN = [MIN_MAX_REGEX_8_20, ONLY_DIGITS_REGEX];

const checkTelMinMaxDigits = (value: string): boolean => {
  return REGEXEN.map((v: RegExp) => v.test(value)).every((v) => v);
};

export function telMinMaxDigitsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const isContain = checkTelMinMaxDigits(control.value);
    return !isContain ? { tel: true } : null;
  };
}
