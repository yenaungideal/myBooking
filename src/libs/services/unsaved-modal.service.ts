import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, lastValueFrom } from 'rxjs';
import { IModalClickAction } from '../types';
import { ModalComponent } from '../widgets/modal/modal.component';

@Injectable()
export class UnsavedModalService {
  private isCleanPage = false;

  private readonly dialog = inject(MatDialog);

  public isDirtyPage(): boolean {
    return !this.isCleanPage;
  }

  public setDirtyPage(): void {
    this.isCleanPage = false;
  }

  public async openUnsavedModal(): Promise<boolean> {
    if (!this.isCleanPage) {
      const response = await lastValueFrom(this.openHaloModal());
      this.isCleanPage = response?.action === 'yes';
    }

    return this.isCleanPage;
  }

  private openHaloModal(): Observable<IModalClickAction | undefined> {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        modalView: 'default',
        title: 'Unsaved Changes',
        message: ` You will lose all information you’ve added. <br /> Are you sure you want to continue?`,
        actionButtonList: [
          {
            buttonLabel: 'Go Back',
            buttonStyle: 'primary',
            actionLabel: 'cancel',
          },
          {
            buttonLabel: 'Yes, Exit',
            buttonStyle: 'secondary',
            actionLabel: 'yes',
          },
        ],
        closeCb: (action: IModalClickAction) => dialogRef.close(action),
      },
      maxHeight: '80vh',
      autoFocus: false,
      disableClose: true,
    } as MatDialogConfig);

    return dialogRef.afterClosed();
  }
}
