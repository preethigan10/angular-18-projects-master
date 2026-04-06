import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../model/interface';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AlertService } from '../../services/alert.service';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  products: Product[] = []; // all products
  productService = inject(ProductsService);
  categories: any[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = 'all';
  router = inject(Router);
  cartService = inject(CartService);
  alertService = inject(AlertService);

  constructor(private cd: ChangeDetectorRef) {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res;
      this.filteredProducts = this.products;
      const allCategories = this.products.map((product) => product.category);
      this.categories = [...new Set(allCategories)];
    });
  }

  ngOnInit(): void {}

  filterByCategory(cat: string) {
    this.selectedCategory = cat;
    this.filteredProducts = this.products.filter((p) => p.category === cat);
  }

  showAllProducts() {
    this.selectedCategory = 'all';
    this.filteredProducts = this.products;
  }

  goToProductDetails(id: number) {
    this.router.navigate(['/product/' + id]);
  }

  addToCart(product: Product) {
    const prodSelected = new Product();
    if (product.quantity == 1) {
      product.inStock = false;
      this.cd.detectChanges();  // force UI update
      this.products.find(item => item.id === product.id)!.inStock = false;
    }
    prodSelected.id = product.id;
    prodSelected.vendorId = product.vendorId;
    prodSelected.title = product.title;
    prodSelected.price = product.price;
    prodSelected.category = product.category;
    prodSelected.description = product.description;
    prodSelected.image = product.image;
    prodSelected.inStock = product.inStock;
    prodSelected.rating = product.rating;
    prodSelected.quantity = product.quantity - 1;
    prodSelected.hasDiscount = product.hasDiscount;
    prodSelected.discountPercentage = product.discountPercentage;
    prodSelected.cartQty = 1;
    this.cartService.addItem(prodSelected);
    this.alertService.show('success', 'Product Added To Cart');
  }
}
