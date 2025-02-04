import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PasswordValidatorsEnum } from '../../validators/password-validator/password-validators.enums';

type IPasswordValidators = {
  [key in PasswordValidatorsEnum]: { valid: boolean; text: string };
};

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'password-match-error',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    *ngIf="parentControl.touched || parentControl.dirty"
    class="text-left ml-2"
  >
    <div *ngIf="parentControl.getError('passwordMismatch')">
      <span class="text-warn w-2 h-2"></span>
      <span class="text-xs text-primary-900">&nbsp;Passwords do not match</span>
    </div>
    <div *ngIf="!parentControl.errors">
      <span class="text-success w-2 h-2"></span>
      <span class="text-xs text-primary-900">&nbsp;Passwords match</span>
    </div>
  </div>`,
})
export class PasswordMatchErrorComponent {
  @Input() public parentControl!: FormControl;
}
