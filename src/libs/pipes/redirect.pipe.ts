import { LocationStrategy } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'redirectPipe',
  standalone: true,
})
export class RedirectPipe implements PipeTransform {
  public constructor(public readonly locationStrategy: LocationStrategy) {}

  public transform(link: string, base: string): string {
    return `${
      this.locationStrategy.getBaseHref().indexOf('/' + base) < 0
        ? '/' + base
        : ''
    }/${link}`;
  }
}
