import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductSelected } from '../../model/interface';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);
  cartService = inject(CartService);
  productId = signal(0);
  product = new Product();
  quantity: number = 1;
  router = inject(Router);

  constructor() {
    this.activatedRoute.params.subscribe((res: any) => {
      this.productId.set(res.id);
      this.productService.getProducts().subscribe((res: any) => {
      const products = res;
      const prod = products.find((item: any) => item.id === this.productId());
      this.product = prod;
    });
    });
    
  }

  ngOnInit() {}

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  goBack(){
    this.router.navigate(['/']);
  }

  addToCart(){
    const prodSelected = new ProductSelected();
    prodSelected.id = this.product.id;
    prodSelected.title = this.product.title;
    prodSelected.price = this.product.price;
    prodSelected.category = this.product.category;
    prodSelected.image = this.product.image;
    prodSelected.quantity = this.quantity;
    this.cartService.addItem(prodSelected);
    // console.log(this.cartService.getCartItems());
  }
}
