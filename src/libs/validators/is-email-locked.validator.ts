import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';

export function checkIsEmailLockedValidator(
  checkUserLocked: (value: string) => Promise<boolean | undefined>,
  message: string
): AsyncValidatorFn {
  return async (control: AbstractControl): Promise<ValidationErrors | null> => {
    try {
      const isLocked = await checkUserLocked(control.value);
      return isLocked
        ? {
            customError: message,
          }
        : null;
    } catch {
      return null;
    }
  };
}
