import { Injectable } from '@angular/core';
import { Cart, Product, ProductSelected } from '../model/interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
   private readonly itemsSubject  = new BehaviorSubject<ProductSelected[]>([]);
   readonly items$ = this.itemsSubject.asObservable();

  addItem(prod: ProductSelected) {
    const values = this.itemsSubject.getValue();    
    const existingProduct = values.find(product => product.id === prod.id);
    if (existingProduct) {
       // updating existing product
        existingProduct.quantity+= prod.quantity;
        console.log(existingProduct);
        if (!existingProduct.quantity){
          this.removeItem(existingProduct.id);
        } else {
          this.itemsSubject.next(values);
        }
    } else {
        this.itemsSubject.next([...values, prod]);
    }
  }

  removeItem(id: number) {
    const updatedItems = this.itemsSubject.getValue().filter(item => item.id !== id);
    this.itemsSubject.next(updatedItems);
  }

  getCartItems() {
    return this.itemsSubject;
  }

}
