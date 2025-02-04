import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { catchError, from, map, Observable, of } from 'rxjs';

export function checkIsEmailExistValidator(
  checkUserAvailability: (value: string) => Promise<boolean | null>
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return from(checkUserAvailability(control.value)).pipe(
      map((v) => {
        return v ? { isEmailExist: true } : null;
      }),
      catchError(() => of(null))
    );
  };
}
