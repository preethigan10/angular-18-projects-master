import { inject, Injectable } from '@angular/core';
import { Order, Product } from '../model/interface';
import { API_URL } from '../core/constants/constants';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  http = inject(HttpClient);
  constructor() {}

  getCombinedData(vendorId: number) {
    return forkJoin({
      products: this.http.get<Product[]>(API_URL + `products?vendorId=${vendorId}`),
      orders: this.http.get<Order[]>(API_URL + `orders`),
    });
  }

  getProductsByVendor(vendorId: number) {
    return this.http.get<Product[]>(API_URL + `products?vendorId=${vendorId}`);
  }

  getOrdersByVendor() {
    return this.http.get<Order[]>(API_URL + `orders`);
  }
}
