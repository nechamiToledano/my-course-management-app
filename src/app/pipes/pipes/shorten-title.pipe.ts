import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTitle',
  standalone: true,
})
export class ShortenTitlePipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
