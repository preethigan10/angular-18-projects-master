import { Injectable, signal } from '@angular/core';
import { Cart, Product } from '../model/interface';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  private readonly itemsSubject = new BehaviorSubject<Product[]>([]);
  readonly items$ = this.itemsSubject.asObservable();
  cartItemsNumber = signal(0);

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

  getCartItemById(id: number) {
    // finding out cart items already present have quantity to be add to cart
    return this.items$.pipe(
      map((items) => {
        const item = items.find((i) => i.id === id);
        return item ? item.inStock : true;
      }),
    );
  }

  setCartItemsNo(no: number) {
    this.cartItemsNumber.set(no);
  }

  clearCart() {
    this.itemsSubject.next([]);
  }
}
