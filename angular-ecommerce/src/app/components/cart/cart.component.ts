import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../model/interface';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: Product[] = [];
  cartService = inject(CartService);
  totalPrice: number = 0;
  router = inject(Router);

  ngOnInit() {
    this.cartService.getCartItems().subscribe((res: any) => {
      this.cartItems = res;
    });
    // this.calculateTotal();
  }

  increaseQty(item: Product) {
    if (item.cartQty < item.quantity) {
      item.cartQty++;
      this.cartService.updateItem(item);
    } else if (item.cartQty === item.quantity) {
      alert('Stock limit reached');
    }
  }

  decreaseQty(item: any) {
    item.cartQty--;
    this.cartService.updateItem(item);
  }

  removeItem(item: any) {
    this.cartService.removeItem(item.id);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
