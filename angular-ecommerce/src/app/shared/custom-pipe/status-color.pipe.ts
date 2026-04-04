import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
  standalone: true
})
export class StatusColorPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case 'Pending': return 'bg-warning text-dark';
      case 'Shipped': return 'bg-info text-dark';
      case 'Delivered': return 'bg-success text-white';
      default: return 'bg-success text-white';
    }
  }

}
