import { Injectable, computed, signal } from '@angular/core';
import { IAuthState } from './auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public get isAuthenticated(): boolean {
    return this.authState() !== undefined;
  }

  public authState = computed(() => this.state());

  protected state = signal<IAuthState | undefined>(undefined);

  public updateAuthState(authState: IAuthState): void {
    this.state.update((s) => ({ ...s, ...authState }));
  }

  public setAuthState(authState: IAuthState): void {
    this.state.set(authState);
  }

  public getToken(): string {
    return 'Token123';
  }
}
