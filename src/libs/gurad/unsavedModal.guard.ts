import { inject } from '@angular/core';
import { UnsavedModalService } from '../services';

export function unsavedModalGuard(): Promise<boolean> {
  return inject(UnsavedModalService).openUnsavedModal();
}
