import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../model/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  products: Product[] = []; // all products
  productService = inject(ProductsService);
  categories: any[]= [];
  filteredProducts: Product[] = [];
  selectedCategory: string = 'all';
  router = inject(Router);

  constructor() {
     this.productService.getProducts().subscribe((res: any) => {
      this.products = res;
      this.filteredProducts = this.products;
      const allCategories = this.products.map(product => product.category);
      this.categories = [...new Set(allCategories)];
    });
  }

  ngOnInit(): void {
   
  }

  filterByCategory(cat:string){
    this.selectedCategory = cat;
    this.filteredProducts = this.products.filter(
      p => p.category === cat
    );
  }

  showAllProducts(){
    this.selectedCategory = 'all';
    this.filteredProducts = this.products;
  }

  goToProductDetails(id: number){
    this.router.navigate(['/product/'+ id]);
  }
  
}
