import { inject, Injectable } from '@angular/core';
import { API_URL } from '../core/constants/constants';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/interface';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + 'products');
  }

  getProductsById(productId: number): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + `products/${productId}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(API_URL + 'productCategories');
  }

  updateProduct(product: Product) {
    return this.http.put(API_URL + `products/${product.id}`, product);
  }

  addProduct(product: Product) {
    return this.http.post(API_URL + 'products', product);
  }

  updateProductStock(
    reducedQuantity: number,
    productId: number,
  ): Observable<any> {
    return this.http.get<any>(API_URL + `products/${productId!}`).pipe(
      switchMap((p: any) => {
        const updatedProduct = { ...p, quantity: p.quantity - reducedQuantity };
        return this.http.put(API_URL + `products/${productId}`, updatedProduct);
      }),
    );
  }

  deleteProduct(productId: number) {
    return this.http.delete<any>(API_URL + `products/${productId}`);
  }
}
