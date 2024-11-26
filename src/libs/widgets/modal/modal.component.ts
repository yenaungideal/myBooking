import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnsavedModalService } from '../../services';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'modal',
  standalone: true,
  templateUrl: './modal.component.html',
  providers: [UnsavedModalService], // isolate unsavedModalService instance for each modal dialog
})
export class ModalComponent {
  public readonly data = inject(MAT_DIALOG_DATA);
}
