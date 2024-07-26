import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millisToIso',
  standalone: true,
})
export class MillisToIsoPipe implements PipeTransform {
  transform(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toISOString();
  }
}
