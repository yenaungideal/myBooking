import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true,
  pure: false,
})
export class HighlightPipe implements PipeTransform {
  public constructor(public sanitizer: DomSanitizer) {}

  public transform(
    item: string,
    searchString: string,
    isGoogleAutoComplete?: boolean
  ): string {
    if (!item || !searchString) {
      return item;
    }

    const highlightedString = item.replace(
      new RegExp(this.escapeRegExpression(searchString), 'gi'),
      (match) => {
        return isGoogleAutoComplete
          ? '<span style="font-weight:700;font-size:14px;color:#234c9f">' +
              match +
              '</span>'
          : '<span style="font-weight:700;font-size:14px;color:#000000">' +
              match +
              '</span>';
      }
    );

    return highlightedString;
  }

  // Escape the special characters
  // The escapeRegExpression() function uses a regular expression to find and escape all characters that have special meanings in regular expressions, including:
  // . (dot)
  // * (asterisk)
  // + (plus)
  // ? (question mark)
  // ^ (caret)
  // $ (dollar sign)
  // { and } (curly braces)
  // ( and ) (parentheses)
  // | (pipe)
  // [ and ] (square brackets)
  // \\ (backslash)
  private escapeRegExpression(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
  }
}
