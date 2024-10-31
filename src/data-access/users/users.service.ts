import {
  Inject,
  Injectable,
  Injector,
  computed,
  inject,
  signal,
} from '@angular/core';
import { IUsers } from './users.interface';
import { ApiQueryResult, SHOW_UNIVERSAL_LOADER } from '../../libs/types';
import { Env } from '../../environments';
import { ApiCacheService } from '../../libs/services';
import { HttpContext } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsersService {
  protected state = signal<IUsers | undefined>(undefined);
  private readonly apiCacheService = inject(ApiCacheService);
  private readonly injector = inject(Injector);
  public currentUser = computed(() => this.state());

  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) {}

  public updateCurrentUser(user: IUsers): void {
    this.state.update((s) => ({ ...s, ...user }));
  }

  public setCurrentUser(user: IUsers): void {
    this.state.set(user);
  }

  public getUserByCredential(credential: any): ApiQueryResult<unknown> {
    const payload = credential;
    const url = `${this.ENVIRONMENT.API_URL}/user`;
    const queryKeys = ['user', 'list', credential];
    return this.apiCacheService.postQuery(
      url,
      payload,
      queryKeys,
      this.injector,
      {
        context: new HttpContext().set(SHOW_UNIVERSAL_LOADER, true),
      }
    );
  }
}
