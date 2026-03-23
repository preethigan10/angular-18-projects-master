import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Product, User } from '../../model/interface';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { SignInComponent } from '../../shared/sign-in/sign-in.component';
import { SignUpComponent } from '../../shared/sign-up/sign-up.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    SignInComponent,
    SignUpComponent,
    AlertComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';

  products: Product[] = []; // all products
  filteredProducts: Product[] = []; // products shown on screen
  productService = inject(ProductsService);
  router = inject(Router);
  cartService = inject(CartService);
  authService = inject(AuthService);
  signInModal = false;
  signUpModal = false;
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: 'customer',
    vendorName: '',
  };
  showProfile = false;

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res;
    });
    this.cartService.getCartItems().subscribe((res: any) => {
      const allQuantity = res.map((item: any) => item.cartQty);
      const sum = allQuantity.reduce((acc: any, val: any) => acc + val, 0);
      if (sum) {
        this.cartService.setCartItemsNo(sum);
      } else {
        this.cartService.setCartItemsNo(0);
      }
    });
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

  goToCartPage() {
    this.router.navigate(['/cart/']);
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }
  logout() {
    this.authService.logout();
  }
}
