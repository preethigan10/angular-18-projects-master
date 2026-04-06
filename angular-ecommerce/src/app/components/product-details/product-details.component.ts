import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/interface';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AlertService } from '../../services/alert.service';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);
  cartService = inject(CartService);
  productId: number = 0;
  product = new Product();
  quantity: number = 1;
  router = inject(Router);
  alertService = inject(AlertService);

  constructor() {
    this.activatedRoute.params.subscribe((res: any) => {
      this.productId = res.id;
      this.productService
        .getProductsById(this.productId)
        .subscribe((res: any) => {
          this.product = res;
        });
        
    });
  }

  ngOnInit() {
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  addToCart() {
    if (this.product.quantity == 1) {
      this.product.inStock = false;
    }
    const prodSelected = new Product();
    prodSelected.id = this.product.id;
    prodSelected.vendorId = this.product.vendorId;
    prodSelected.title = this.product.title;
    prodSelected.price = this.product.price;
    prodSelected.category = this.product.category;
    prodSelected.description = this.product.description;
    prodSelected.image = this.product.image;
    prodSelected.inStock = this.product.inStock;
    prodSelected.rating = this.product.rating;
    prodSelected.quantity = this.product.quantity - 1;
    prodSelected.cartQty = this.quantity;
    prodSelected.hasDiscount = this.product.hasDiscount;
    prodSelected.discountPercentage = this.product.discountPercentage;
    this.cartService.addItem(prodSelected);
    this.alertService.show('success', 'Product Added To Cart');
    // console.log(this.cartService.getCartItems());
  }
}
