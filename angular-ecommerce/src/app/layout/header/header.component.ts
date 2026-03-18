import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../model/interface';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  cartItemsNumber: number = 0;

  products: Product[] = []; // all products
  filteredProducts: Product[] = []; // products shown on screen
  productService = inject(ProductsService);
  router = inject(Router);
  cartService = inject(CartService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res;
    });
    this.cartService.getCartItems().subscribe((res: any)=>{
      const allQuantity = res.map((item: any) => item.quantity);
      const sum = allQuantity.reduce((acc: any, val: any) => acc + val, 0);
      if(sum){
        this.cartItemsNumber = sum;
      } else {this.cartItemsNumber = 0;}
      
    })
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }

  selectProduct(product: Product) {
    this.searchQuery = product.title;
    this.filteredProducts = [];
    this.router.navigate(['/product/' + product.id]);
  }

  searchProduct() {}

  goToCartPage(){
    this.router.navigate(['/cart/']);
  }
}
