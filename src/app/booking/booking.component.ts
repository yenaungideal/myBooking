
import { Component, computed, Inject, inject, resource } from '@angular/core';
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
})
export class BookingComponent {
  public displayedColumns = [
    'id',
    'type',
    'bookingDate',
    'mobileNumber',
    'time',
  ];

  public bookingsS = computed(() => this.bookingResource.value());

  private bookingService = inject(BookingService);
  private bookingResource = resource({
    loader: async () => {
      const bookingQueryData = await this.bookingService.getBooking().data();
      return bookingQueryData as IBooking[];
    },
  });

  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) {}
}
