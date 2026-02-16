import { HttpContext } from '@angular/common/http';
import { Inject, Injectable, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../environments';
import { ApiService } from '../../libs/services';
import { SHOW_UNIVERSAL_LOADER } from '../../libs/types';
import { IAuthState } from './auth.interface';

interface IRegisterUserRequest {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiService = inject(ApiService);

  public get isAuthenticated(): boolean {
    return this.authState() !== undefined;
  }

  public readonly authState = computed(() => this.state());

  protected readonly state = signal<IAuthState | undefined>(undefined);

  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) { }

  public updateAuthState(authState: Partial<IAuthState>): void {
    this.state.update((s) => (s ? { ...s, ...authState } : undefined));
  }

  public setAuthState(authState: IAuthState): void {
    this.state.set(authState);
  }

  public clearAuthState(): void {
    this.state.set(undefined);
  }

  /**
   * Get the authentication token from the current state
   * @returns The authentication token or undefined if not authenticated
   */
  public getToken(): string | undefined {
    return this.state()?.token?.toString();
  }

  public registerUser<T = unknown>(credentials: IRegisterUserRequest): Observable<T> {
    const url = `${this.ENVIRONMENT.API_URL}/user/signup`;
    return this.apiService.post<T, IRegisterUserRequest>(url, credentials, {
      context: new HttpContext().set(SHOW_UNIVERSAL_LOADER, true),
    });
  }
}
