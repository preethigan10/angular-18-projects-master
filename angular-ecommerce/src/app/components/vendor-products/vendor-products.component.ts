import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../model/interface';
import { VendorService } from '../../services/vendor.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VendorEditProductComponent } from '../vendor-edit-product/vendor-edit-product.component';
import { VendorAddProductComponent } from '../vendor-add-product/vendor-add-product.component';
import { ProductsService } from '../../services/products.service';
import { LowStockDirective } from '../../shared/custom-directives/low-stock.directive';

@Component({
  selector: 'app-vendor-products',
  standalone: true,
  imports: [
    CommonModule,
    VendorEditProductComponent,
    VendorAddProductComponent,
    LowStockDirective
  ],
  templateUrl: './vendor-products.component.html',
  styleUrl: './vendor-products.component.css',
})
export class VendorProductsComponent implements OnInit {
  vendorId: number = 0;
  totalProducts = 0;
  vendorService = inject(VendorService);
  productService = inject(ProductsService);
  authService = inject(AuthService);
  products: Product[] = [];
  lowStock = signal(0);
  router = inject(Router);
  showEditModal: boolean = false;
  showAddModal: boolean = false;
  selectProduct: Product | null = null;

  ngOnInit(): void {
    this.vendorId = Number(this.authService.userSignal().id);
    // products
    this.vendorService
      .getProductsByVendor(this.vendorId)
      .subscribe((data: any) => {
        this.products = data;
      });
  }

  updateTable() {
    // products
    this.vendorService
      .getProductsByVendor(this.vendorId)
      .subscribe((data: any) => {
        this.products = data;
      });
  }

  addProduct() {
    this.showAddModal = true;
  }

  editProduct(productId: number) {
    this.showEditModal = true;
    this.selectProduct = this.products.find((p) => p.id === productId) || null;
    console.log(this.selectProduct);
  }

  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        // Refresh the product list after deletion
        this.vendorService.getProductsByVendor(this.vendorId).subscribe((data: any) => {
          this.products = data;
          this.totalProducts = data.length;
          const stock = data.filter((p: Product) => p.inStock === false).length;
          this.lowStock.set(stock);
        });
      });
    }
  }
}
