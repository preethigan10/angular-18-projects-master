import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../model/interface';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { SignInComponent } from '../../shared/sign-in/sign-in.component';
import { AlertService } from '../../services/alert.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { AuthService } from '../../services/auth.service';
import { OrderSummaryComponent } from '../../shared/order-summary/order-summary.component';
import { TotalPricePipe } from '../../shared/custom-pipe/total-price.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    AlertComponent,
    OrderSummaryComponent,
    TotalPricePipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: Product[] = [];
  cartService = inject(CartService);
  totalPrice: number = 0;
  router = inject(Router);
  isVisible = false;
  totalItems: number = 0;
  alertService = inject(AlertService);

  ngOnInit() {
    this.cartService.getCartItems().subscribe((res: any) => {
      this.cartItems = res;
      this.totalItems = this.cartItems.reduce((sum, i) => sum + i.cartQty, 0);
      // below code is array reference because pipe are pure
      this.cartItems = [...this.cartItems];
      // bloew code is made as pipe
      // this.totalPrice = this.cartItems.reduce((total, item) => {
      //   return total + item.price * item.cartQty;
      // }, 0);
    });
  }

  increaseQty(item: Product) {
    if (item.cartQty < item.quantity) {
      item.cartQty++;
      this.cartService.updateItem(item);
    } else if (item.cartQty === item.quantity) {
      this.alertService.show('info', 'Stock limit reached');
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
