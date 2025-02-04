import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(controlName: string): ValidatorFn {
  return (matchingControl: AbstractControl) => {
    if (!matchingControl.parent?.controls) return null;
    const control: AbstractControl = (
      matchingControl.parent?.controls as Record<string, AbstractControl>
    )[controlName];
    if (control && matchingControl) {
      if (
        matchingControl.errors &&
        !matchingControl.errors['passwordMismatch']
      ) {
        return null;
      }
      if (control.value !== matchingControl.value) {
        return { passwordMismatch: true };
      } else {
        return null;
      }
    }
    return null;
  };
}
