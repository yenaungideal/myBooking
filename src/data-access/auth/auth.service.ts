import { HttpContext } from '@angular/common/http';
import { Inject, Injectable, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../environments';
import { ApiService } from '../../libs/services';
import { SHOW_UNIVERSAL_LOADER } from '../../libs/types';
import { IAuthState } from './auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiService = inject(ApiService);

  public get isAuthenticated(): boolean {
    return this.authState() !== undefined;
  }

  public authState = computed(() => this.state());

  protected state = signal<IAuthState | undefined>(undefined);

  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) {}

  public updateAuthState(authState: IAuthState): void {
    this.state.update((s) => ({ ...s, ...authState }));
  }

  public setAuthState(authState: IAuthState): void {
    this.state.set(authState);
  }

  public getToken(): string {
    return 'Token123';
  }

  public registerUser<T>(credentials: any): Observable<T> {
    const payload = credentials;
    const url = `${this.ENVIRONMENT.API_URL}/user/signup`;
    return this.apiService.post(url, payload, {
      context: new HttpContext().set(SHOW_UNIVERSAL_LOADER, true),
    });
  }
}
