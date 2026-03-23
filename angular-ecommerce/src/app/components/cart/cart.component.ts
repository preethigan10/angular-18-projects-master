import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../model/interface';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { SignInComponent } from '../../shared/sign-in/sign-in.component';
import { AlertService } from '../../services/alert.service';
import { AlertComponent } from "../../shared/alert/alert.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule, SignInComponent, AlertComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: Product[] = [];
  cartService = inject(CartService);
  totalPrice: number = 0;
  router = inject(Router);
  isVisible = false;
  openPopup(): void {
    this.isVisible = true;
  }
  closePopup(): void {
    this.isVisible = false;
  }
  alertService = inject(AlertService);

  ngOnInit() {
    this.cartService.getCartItems().subscribe((res: any) => {
      this.cartItems = res;
      this.totalPrice = this.cartItems.reduce((total, item) => {
        return total + item.price * item.cartQty;
      }, 0);
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

  goTocheckOut() {
    this.openPopup();
  }
}
