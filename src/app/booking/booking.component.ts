
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Inject,
  inject,
  resource,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { IBooking } from '../../data-access/booking/booking.interface';
import { BookingService } from '../../data-access/booking/booking.service';
import { Env } from '../../environments';

@Component({
  selector: 'app-booking',
  imports: [MatTableModule],
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent {
  public readonly displayedColumns = [
    'id',
    'type',
    'bookingDate',
    'mobileNumber',
    'time',
  ];

  public readonly bookingsS = computed(() => this.bookingResource.value());

  private readonly bookingService = inject(BookingService);
  private readonly bookingResource = resource({
    loader: async () => {
      const bookingQueryData = await this.bookingService.getBooking().data();
      return bookingQueryData as IBooking[];
    },
  });

  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) { }
}
