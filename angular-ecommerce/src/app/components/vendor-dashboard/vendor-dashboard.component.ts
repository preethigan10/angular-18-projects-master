import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Order, Product } from '../../model/interface';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.css',
})
export class VendorDashboardComponent implements OnInit {
  products: Product[] = [];
   orders: Order[] = [];
  showAddProduct = false;
  totalSales = 0;
  totalOrders = 0;
  totalProducts = 0;
  http = inject(HttpClient);
  lowStock = 0;
  productService = inject(ProductsService);
  orderService = inject(OrdersService);
  activeTab: string = '';

  ngOnInit() {

     this.orderService.getOrders().subscribe((data: any) => {
      this.totalOrders = data.length;

      this.totalSales = data.reduce((sum: any, o: any) => sum + o.total, 0);
      console.log(this.totalOrders);
      console.log(this.totalSales);
    });

    this.productService.getProducts().subscribe((res: any) => {
      this.products = res;
    });

    this.lowStock = this.products.filter((p) => p.inStock === false).length;
  }

  openAddProduct() {
    // open form modal
    this.showAddProduct = true;
  }
  editProduct(p: any) {
    // open form modal with pre-filled data
  }

  updateStatus(o: any) {}

  viewOrder(o: any) {
    // open order details modal
  }

  deleteProduct(p: any) {
    this.products = this.products.filter((item) => item !== p);
  }
}
