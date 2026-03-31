import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../core/constants/constants';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

   http = inject(HttpClient);
  
    constructor() { }
  
    getOrders(): Observable<any> {
      return this.http.get(API_URL + 'orders');
    }

    addOrder(orderData: any): Observable<any> {
      return this.http.post(API_URL + 'orders', orderData);
    }

//     updateStatus(order: any) {
//   this.http.patch(
//     `http://localhost:3000/orders/${order.id}`,
//     { status: order.status }
//   ).subscribe(() => {
//     console.log('Status updated');
//   });
// }

}
