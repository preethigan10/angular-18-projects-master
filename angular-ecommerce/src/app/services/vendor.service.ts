import { inject, Injectable } from '@angular/core';
import { Order, Product } from '../model/interface';
import { API_URL } from '../core/constants/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  http = inject(HttpClient);
  constructor() {}

  getProductsByVendor(vendorId: number) {
    return this.http.get<Product[]>(API_URL + `products?vendorId=${vendorId}`);
  }

  getOrdersByVendor() {
    return this.http.get<Order[]>(API_URL + `orders`);
  }


}
