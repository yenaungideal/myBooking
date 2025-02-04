import { AbstractControl, ValidatorFn } from '@angular/forms';
import { parse } from 'date-fns';
import { OperatingHoursCustomErrorType } from './opening-hours-validators.interface';

export function openingHoursValidator(controlName: string): ValidatorFn {
  return (openingHourControl: AbstractControl) => {
    if (!openingHourControl.parent?.controls) return null;
    const closingHourControl: AbstractControl = (
      openingHourControl.parent?.controls as Record<string, AbstractControl>
    )[controlName];
    if (openingHourControl && closingHourControl) {
      resetErrorStateInOperatingHoursControl(
        openingHourControl,
        closingHourControl
      );
      if (
        areTheOpeningAndClosingHoursTheSame(
          openingHourControl,
          closingHourControl
        )
      ) {
        return {
          customError:
            OperatingHoursCustomErrorType.OpeningAndClosingHoursAreTheSame,
        };
      } else if (
        isOpeningHoursAreLaterThanClosingHours(
          openingHourControl,
          closingHourControl
        )
      ) {
        return {
          customError:
            OperatingHoursCustomErrorType.OpeningHoursAreLaterThanClosingHours,
        };
      }
    }
    return null;
  };
}

function areTheOpeningAndClosingHoursTheSame(
  openingHourControl: AbstractControl,
  closingHourControl: AbstractControl
): boolean {
  return getTimeValue(openingHourControl.value) ===
    getTimeValue(closingHourControl.value)
    ? true
    : false;
}

function isOpeningHoursAreLaterThanClosingHours(
  openingHourControl: AbstractControl,
  closingHourControl: AbstractControl
): boolean {
  return getTimeValue(openingHourControl.value) >
    getTimeValue(closingHourControl.value)
    ? true
    : false;
}

function resetErrorStateInOperatingHoursControl(
  openingHourControl: AbstractControl,
  closingHourControl: AbstractControl
): void {
  openingHourControl.setErrors(null);
  if (!closingHourControl.hasError('required')) {
    closingHourControl.setErrors(null);
  }
}

function getTimeValue(timeStr: string): number {
  const date = parse(timeStr, 'hh:mm a', new Date());
  let hours24 = date.getHours();
  if (hours24 === 0 && timeStr.includes('AM')) {
    hours24 = 0;
  } else if (hours24 === 12 && timeStr.includes('PM')) {
    hours24 = 12;
  }
  return hours24;
}
