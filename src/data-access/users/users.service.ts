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

@Injectable({ providedIn: 'root' })
export class UsersService {
  public currentUser = computed(() => this.state());
  protected state = signal<IUsers | undefined>(undefined);
  private readonly apiCacheService = inject(ApiCacheService);
  private readonly apiService = inject(ApiService);
  private readonly injector = inject(Injector);

  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) {}

  public updateCurrentUser(user: IUsers): void {
    this.state.update((s) => ({ ...s, ...user }));
  }

  public setCurrentUser(user: IUsers): void {
    this.state.set(user);
  }

  public getUsers(): ApiQueryResult<unknown> {
    const url = `${this.ENVIRONMENT.API_URL}/user`;
    const queryKeys = ['user', 'list'];
    return this.apiCacheService.getQuery(url, queryKeys, this.injector, {
      context: new HttpContext().set(SHOW_UNIVERSAL_LOADER, true),
    });
  }

  public getUserByCredential<T>(credential: any): Observable<T> {
    const payload = credential;
    const url = `${this.ENVIRONMENT.API_URL}/user`;
    return this.apiService.post(url, payload, {
      context: new HttpContext().set(SHOW_UNIVERSAL_LOADER, true),
    });
  }
}
