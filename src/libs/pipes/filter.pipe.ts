import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  // TODO: if we use it somewhere else please rename it to more specific name or to related action
  name: 'filter',
  standalone: true,
  pure: false,
})
export class FilterPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public transform(items: any, filterString: string, properties: string[]) {
    if (items.length === 0 || !filterString) {
      return items;
    }
    // TODO: this pipe removes items for mat-select, therefore produces issue with selection.
    // the items should be hidden instead of removed
    const filteredItems = [];

    for (const item of items) {
      let isPropertyExist = false;
      for (const property of properties) {
        if (item[property]) {
          if (
            item[property].toLowerCase().includes(filterString?.toLowerCase())
          ) {
            isPropertyExist = true;
          }
        }
      }

      if (isPropertyExist) {
        filteredItems.push(item);
      }
    }
    return filteredItems;
  }
}
