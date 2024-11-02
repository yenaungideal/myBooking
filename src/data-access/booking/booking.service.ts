import {
  Inject,
  Injectable,
  Injector,
  computed,
  inject,
  signal,
} from '@angular/core';
import { IBooking } from './booking.interface';
import { ApiQueryResult, SHOW_UNIVERSAL_LOADER } from '../../libs/types';
import { Env } from '../../environments';
import { ApiCacheService, ApiService } from '../../libs/services';
import { HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
  public currentBooking = computed(() => this.state());
  protected state = signal<IBooking | undefined>(undefined);
  private readonly apiCacheService = inject(ApiCacheService);
  private readonly apiService = inject(ApiService);
  private readonly injector = inject(Injector);

  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) {}

  public updateCurrentBooking(booking: IBooking): void {
    this.state.update((s) => ({ ...s, ...booking }));
  }

  public setCurrentBooking(booking: IBooking): void {
    this.state.set(booking);
  }

  public getBooking(): ApiQueryResult<unknown> {
    const url = `${this.ENVIRONMENT.API_URL}/booking`;
    const queryKeys = ['booking', 'list'];
    return this.apiCacheService.getQuery(url, queryKeys, this.injector, {
      context: new HttpContext().set(SHOW_UNIVERSAL_LOADER, true),
    });
  }

  public getBookingById<T>(id: any): Observable<T> {
    const payload = id;
    const url = `${this.ENVIRONMENT.API_URL}/booking`;
    return this.apiService.post(url, payload, {
      context: new HttpContext().set(SHOW_UNIVERSAL_LOADER, true),
    });
  }
}
