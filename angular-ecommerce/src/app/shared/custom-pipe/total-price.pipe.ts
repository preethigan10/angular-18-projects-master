import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalPricePipe',
  standalone: true
})
export class TotalPricePipe implements PipeTransform {

  transform(items: any[]): number {
   return items.reduce((sum, item) =>
      sum + item.price * (item.cartQty || item.quantity), 0);      
  }

}
