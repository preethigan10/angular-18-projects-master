import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../model/interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  cartItemsNumber: number = 10;

  products: Product[] = []; // all products
  filteredProducts: Product[] = []; // products shown on screen
  productService = inject(ProductsService);
    router = inject(Router);

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }

  selectProduct(product: Product){
    this.searchQuery = product.title;
    this.filteredProducts = [];
    this.router.navigate(['/product/'+ product.id]);
  }

  searchProduct() {}
}
