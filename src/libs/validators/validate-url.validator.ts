import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const urlValidationRe =
      // eslint-disable-next-line max-len
      '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})';
    const urlRegex = new RegExp(urlValidationRe, 'igm');

    const match = urlRegex.exec(control.value);

    let isUrlValid = false;
    if (match != null) {
      isUrlValid = match.length > 0;
    }

    return !isUrlValid ? { validateUrl: true } : null;
  };
}
