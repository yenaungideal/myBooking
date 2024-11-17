import { Component, Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, lastValueFrom } from 'rxjs';

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
}
