import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductSelected } from '../../model/interface';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems: ProductSelected[] = [];
  cartService = inject(CartService);
  totalPrice: number = 0;
    router = inject(Router);

  ngOnInit() {

    this.cartService.getCartItems().subscribe((res: any) => {
      this.cartItems = res;
      console.log(this.cartItems);
    });
    // this.calculateTotal();
  }

  increaseQty(item: any) {
    if (item.cartQty < item.quantity) {
      item.cartQty++;
      // this.updateCart();
    }
  }

  decreaseQty(item: any) {
    item.cartQty--;

  }

  removeItem(item: any) {

  }

  goBack(){
    this.router.navigate(['/']);
  }


}
