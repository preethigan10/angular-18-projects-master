import { Injectable } from '@angular/core';
import { Cart, Product } from '../model/interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  private readonly itemsSubject = new BehaviorSubject<Product[]>([]);
  readonly items$ = this.itemsSubject.asObservable();

  addItem(prod: Product) {
    const values = this.itemsSubject.getValue();
    const existingProduct = values.find((product) => product.id === prod.id);
    if (existingProduct) {
      // updating existing product
      existingProduct.cartQty += prod.cartQty;
      // console.log(existingProduct);
      if (!existingProduct.cartQty) {
        this.removeItem(existingProduct.id);
      } else {
        this.itemsSubject.next(values);
      }
    } else {
      this.itemsSubject.next([...values, prod]);
    }
  }

  updateItem(prod: Product) {
    const values = this.itemsSubject.getValue();
    const existingProduct = values.find((product) => product.id === prod.id);
    if (existingProduct) {
      existingProduct.cartQty = prod.cartQty;
      this.itemsSubject.next(values);
    }
  }

  removeItem(id: number) {
    const updatedItems = this.itemsSubject
      .getValue()
      .filter((item) => item.id !== id);
    this.itemsSubject.next(updatedItems);
  }

  getCartItems() {
    return this.itemsSubject;
  }
}
