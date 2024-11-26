import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'infinite-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinite-loader.component.html',
})
export class InfiniteLoaderComponent implements AfterViewInit {
  @Input() public color: 'primary' | 'accent' | 'success' | 'reverse' =
    'primary';

  @Input() public isCustomStyle = false;
  @ViewChild('spinnerElementRef', { static: false })
  public spinnerElementRef!: ElementRef;

  public ngAfterViewInit(): void {
    if (this.isCustomStyle) {
      this.setSpinnerPosition();
    }
  }

  protected setSpinnerPosition(): void {
    const parentElement = this.spinnerElementRef.nativeElement.parentElement
      ?.parentElement as HTMLElement;
    parentElement.style.position = 'relative';
  }
}
