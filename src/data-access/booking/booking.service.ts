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
import { ApiCacheService, ApiService } from '../../libs/services';
import { ApiQueryResult, SHOW_UNIVERSAL_LOADER } from '../../libs/types';
import { IBooking } from './booking.interface';

@Injectable({ providedIn: 'root' })
export class BookingService {
  public readonly currentBooking = computed(() => this.state());
  protected readonly state = signal<IBooking | undefined>(undefined);

  private readonly apiCacheService = inject(ApiCacheService);
  private readonly apiService = inject(ApiService);
  private readonly injector = inject(Injector);

  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) { }

  public updateCurrentBooking(booking: Partial<IBooking>): void {
    this.state.update((s) => (s ? { ...s, ...booking } : undefined));
  }

  public setCurrentBooking(booking: IBooking): void {
    this.state.set(booking);
  }

  public clearCurrentBooking(): void {
    this.state.set(undefined);
  }

  public getBooking(): ApiQueryResult<unknown> {
    const url = `${this.ENVIRONMENT.API_URL}/booking`;
    const queryKeys = ['booking', 'list'];
    return this.apiCacheService.getQuery(url, queryKeys, this.injector, {
      context: new HttpContext().set(SHOW_UNIVERSAL_LOADER, true),
    });
  }

  public getBookingById<T = IBooking>(id: string | number): Observable<T> {
    const url = `${this.ENVIRONMENT.API_URL}/booking/${id}`;
    return this.apiService.get<T>(url, {
      context: new HttpContext().set(SHOW_UNIVERSAL_LOADER, true),
    });
  }
}
