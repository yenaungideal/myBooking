import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  Inject,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { IBooking } from '../../data-access/booking/booking.interface';
import { BookingService } from '../../data-access/booking/booking.service';
import { Env } from '../../environments';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, MatTableModule],
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  public displayedColumns = [
    'id',
    'type',
    'bookingDate',
    'mobileNumber',
    'time',
  ];

  public bookingsS = signal<IBooking[]>([]);

  private bookingService = inject(BookingService);
  private bookingQuery = computed(() => {
    return this.bookingService.getBooking();
  });

  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) {
    effect(() => {
      const bookingQuery = this.bookingQuery();
      untracked(() => {
        if (!bookingQuery.error()) {
          const bookingQueryData = bookingQuery.data() as IBooking[];
          if (bookingQueryData) {
            console.log('---bookingQuery Data---', bookingQueryData);
            this.bookingsS.set(bookingQueryData);
          }
        }
      });
    });
  }
}
