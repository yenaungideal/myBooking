import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, Subscription } from 'rxjs';
import { TranslatePipe } from '../../translation';
import { PasswordValidatorsEnum } from '../../validators/password-validator/password-validators.enums';

type IPasswordValidators = {
  [key in PasswordValidatorsEnum]: { valid: boolean; text: string };
};

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'password-error',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: ` <div
    *ngIf="control.touched || control.dirty"
    class="text-left ml-2"
  >
    <div *ngFor="let v of passwordValidators | keyvalue; let i = index">
      <span *ngIf="v.value.valid" class="text-success w-2 h-2"></span>
      <span *ngIf="!v.value.valid" class="text-warn w-2 h-2"></span>
      <span class="text-xs text-primary-900"
        >&nbsp;{{ v.value.text | trx }}</span
      >
    </div>
  </div>`,
})
export class PasswordErrorsComponent implements OnDestroy {
  @Input() public set parentControl(c: FormControl) {
    this.control = c;
    this.subs.add(
      this.control.valueChanges
        .pipe(startWith(''))
        .subscribe(() => this.validatePasswordErrors())
    );
  }

  public control!: FormControl;
  public passwordValidators: IPasswordValidators = {
    [PasswordValidatorsEnum.minMax]: {
      valid: true,
      text: 'password-errors.min-max-hint',
    },
    [PasswordValidatorsEnum.needNumber]: {
      valid: true,
      text: 'password-errors.need-number-hint',
    },
    [PasswordValidatorsEnum.specialCase]: {
      valid: true,
      text: 'password-errors.special-case-hint',
    },
    [PasswordValidatorsEnum.specialChar]: {
      valid: true,
      text: 'password-errors.special-char-hint',
    },
  };

  private subs = new Subscription();

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private validatePasswordErrors(): void {
    Object.keys(this.passwordValidators).forEach((key) => {
      this.passwordValidators[key as PasswordValidatorsEnum].valid =
        this.control.hasError(
          PasswordValidatorsEnum[key as PasswordValidatorsEnum]
        )
          ? false
          : true;
    });
  }
}
