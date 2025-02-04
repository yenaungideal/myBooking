import { Validators } from '@angular/forms';
import { combinedMinMaxValidator } from './combined-min-max.validator';
import { oneNumberValidator } from './one-number.validator';
import { specialCaseValidator } from './special-case.validator';
import { specialCharValidator } from './special-char.validator';

/**
 * INFO: These validators are required for login/signup password field visual validation
 */
export const passwordErrorsValidators = [
  Validators.required,
  specialCharValidator(),
  specialCaseValidator(),
  combinedMinMaxValidator(),
  oneNumberValidator(),
];
