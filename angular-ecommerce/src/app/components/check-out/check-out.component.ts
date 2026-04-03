import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Order, Product } from '../../model/interface';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderSummaryComponent } from '../../shared/order-summary/order-summary.component';
import { AlertService } from '../../services/alert.service';
import { OrdersService } from '../../services/orders.service';
import { AuthService } from '../../services/auth.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OrderSummaryComponent],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent {
  cartItems: Product[] = [];
  cartService = inject(CartService);
  totalPrice: number = 0;
  totalItems: number = 0;
  router = inject(Router);
  fb = inject(FormBuilder);
  alertService = inject(AlertService);
  ordersService = inject(OrdersService);
  authService = inject(AuthService);
  orderDetails: Order = new Order();
  productService = inject(ProductsService);
  orders: Order[] = [];

  shippingForm = this.fb.group({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{6}$'),
    ]),
  });

  constructor() {}

  get f() {
    return this.shippingForm.controls;
  }

  ngOnInit() {
    this.cartService.getCartItems().subscribe((res: any) => {
      this.cartItems = res;
      this.totalItems = this.cartItems.reduce((sum, i) => sum + i.cartQty, 0);
      this.totalPrice = this.cartItems.reduce(
        (sum, i) => sum + i.price * i.cartQty,
        0,
      );
    });

    this.ordersService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  goBack() {
    this.router.navigate(['/cart']);
  }

  addUserDetails() {}

  placeOrder() {
    if (this.shippingForm.valid) {
      const address =
        this.shippingForm.value.address +
        ', ' +
        this.shippingForm.value.city +
        ', ' +
        this.shippingForm.value.country +
        ' - ' +
        this.shippingForm.value.zipCode;
      const maxId = Math.max(...this.orders.map((o) => o.id || 0));
      const newId = maxId + 1;
      this.orderDetails = {
        id: newId,
        customerId: this.authService.userSignal().id,
        customerName: '',
        address: address,
        items: this.cartItems.map((i) => ({
          productId: i.id,
          vendorId: i.vendorId,
          name: i.title,
          price: i.price,
          qty: i.cartQty,
          image: i.image,
        })),
        total: this.totalPrice,
        status: 'Pending',
      };
      // console.log(this.orderDetails);

      this.ordersService.addOrder(this.orderDetails).subscribe(() => {
        this.alertService.show(
          'success',
          'Order placed successfully! Thank you for shopping with us.',
        );
        // updating stock after order is placed.since order is placed quantity is reduced from stock quantity.
        this.cartItems.forEach((item) => {
          this.productService
            .updateProductStock(item.cartQty, item.id)
            .subscribe(() => {
              console.log('Stock updated for product id: ' + item.id);
            });
        });
        this.cartService.clearCart();
        this.router.navigate(['/']);
      });
    }
  }
}
