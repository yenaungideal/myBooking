import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';

export function currentPasswordCheckValidator(
  checkCurrentPassword: (value: string) => Promise<boolean | undefined>
): AsyncValidatorFn {
  return async (control: AbstractControl): Promise<ValidationErrors | null> => {
    try {
      const isValidPassword = await checkCurrentPassword(control.value);
      return isValidPassword
        ? null
        : { customError: 'Current password is invalid.' };
    } catch {
      return { customError: 'Current password is invalid.' };
    }
  };
}
