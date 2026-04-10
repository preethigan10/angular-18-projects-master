import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    TotalPricePipe,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  cartItems: Product[] = [];
  cartService = inject(CartService);
  totalPrice: number = 0;
  router = inject(Router);
  isVisible = false;
  totalItems: number = 0;
  alertService = inject(AlertService);
  disCountedCartItems: Product[] = [];

  constructor() {
    
  }

  ngOnInit() {
    this.cartService.getCartItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.cartItems = res;
        // we do structured clone because we have array of objects so that change in dscounted array doesnt affect original array
        this.disCountedCartItems = structuredClone(this.cartItems);
        this.disCountedCartItems.forEach((product: Product) => {
          this.getDiscountedPrice(product);
        });
        this.totalItems = this.disCountedCartItems.reduce((sum, i) => sum + i.cartQty, 0);
        // below code is array reference because pipe are pure
        this.disCountedCartItems = [...this.disCountedCartItems];
        // bloew code is made as pipe
        // this.totalPrice = this.cartItems.reduce((total, item) => {
        //   return total + item.price * item.cartQty;
        // }, 0);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // apply discount to price amount
  getDiscountedPrice(product: any): Product {
    if (product.hasDiscount && product.discountPercentage > 0) {
      product.price  = (product.price - (product.price * product.discountPercentage) / 100);
      return product;
    }
    return product;
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
