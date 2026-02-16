import { HttpContext } from '@angular/common/http';
import {
  Inject,
  Injectable,
  Injector,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../environments';
import { ApiService } from '../../libs/services';
import { ApiCacheService } from '../../libs/services/api-cache.service';
import { ApiQueryResult, SHOW_UNIVERSAL_LOADER } from '../../libs/types';
import { IUsers } from './users.interface';

interface IUserCredential {
  userEmail: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  public readonly currentUser = computed(() => this.state());
  protected readonly state = signal<IUsers | undefined>(undefined);

  private readonly apiCacheService = inject(ApiCacheService);
  private readonly apiService = inject(ApiService);
  private readonly injector = inject(Injector);

  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) { }

  public updateCurrentUser(user: Partial<IUsers>): void {
    this.state.update((s) => (s ? { ...s, ...user } : undefined));
  }

  public setCurrentUser(user: IUsers): void {
    this.state.set(user);
  }

  public clearCurrentUser(): void {
    this.state.set(undefined);
  }

  public getUsers(): ApiQueryResult<unknown> {
    const url = `${this.ENVIRONMENT.API_URL}/user`;
    const queryKeys = ['user', 'list'];
    return this.apiCacheService.getQuery(url, queryKeys, this.injector, {
      context: new HttpContext().set(SHOW_UNIVERSAL_LOADER, true),
    });
  }

  public getUserByCredential<T = IUsers>(credential: IUserCredential): Observable<T> {
    const url = `${this.ENVIRONMENT.API_URL}/user`;
    return this.apiService.post<T, IUserCredential>(url, credential, {
      context: new HttpContext().set(SHOW_UNIVERSAL_LOADER, true),
    });
  }
}
