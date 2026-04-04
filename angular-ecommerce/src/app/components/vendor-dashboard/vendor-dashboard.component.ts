import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Order, Product } from '../../model/interface';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { AuthService } from '../../services/auth.service';
import { VendorService } from '../../services/vendor.service';
import { AlertService } from '../../services/alert.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class VendorDashboardComponent implements OnInit, AfterViewInit {
  totalProducts = 0;
  totalSales = 0;
  totalOrders = 0;
  lowStock = signal(0);
  vendorService = inject(VendorService);
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);
  salesChart = viewChild<ElementRef<HTMLInputElement>>('salesChart');
  orderChart = viewChild<ElementRef<HTMLInputElement>>('orderChart');
  salesChartInstance: any;
  ordersChartInstance: any;
  vendorId: number = 0;
  orders: Order[] = [];
  products: Product[] = [];

  constructor() {
    effect(() => {
      const salesChart = this.salesChart()?.nativeElement;
      const ordersChart = this.orderChart()?.nativeElement;
      if (!salesChart || !ordersChart) return;
      // destroy existing chart to create new
      if (this.salesChartInstance) this.salesChartInstance.destroy();
      if (this.ordersChartInstance) this.ordersChartInstance.destroy();
      queueMicrotask(() => this.loadCharts(salesChart, ordersChart));
    });
  }

  ngOnInit() {
    this.vendorId = Number(this.authService.userSignal().id);
    // using forkjoin to call both products and order based on vendorid
    this.vendorService.getCombinedData(this.vendorId).subscribe((res) => {
      // products
      this.products = res.products;
      this.totalProducts = this.products.length;
      const stock = this.products.filter((p: Product) => p.inStock === false).length;
      this.lowStock.set(stock);
      // orders 
      this.orders = res.orders;
      this.totalOrders = this.orders.length;
      this.totalSales = this.orders.reduce((sum, o) => sum + o.total, 0);
    });
    // this.vendorService
    //   .getProductsByVendor(this.vendorId)
    //   .subscribe((data: any) => {
    //     this.products = data;
    //     this.totalProducts = data.length;
    //     const stock = data.filter((p: Product) => p.inStock === false).length;
    //     this.lowStock.set(stock);
    //   });
    // this.vendorService.getOrdersByVendor().subscribe((data) => {
    //   this.totalOrders = data.length;
    //   this.orders = data;
    //   this.totalSales = this.orders.reduce((sum, o) => sum + o.total, 0);
    // });
  }

  loadCharts(salesChart: any, ordersChart: any) {
    this.salesChartInstance = new Chart(salesChart, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Sales',
            data: [5000, 8000, 7500, 10000, 12000, 15000],
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
    this.ordersChartInstance = new Chart(ordersChart, {
      type: 'bar',
      data: {
        labels: ['Pending', 'Shipped', 'Delivered'],
        datasets: [
          {
            label: 'Orders',
            data: [10, 7, 25],
          },
        ],
      },
    });
  }

  ngAfterViewInit() {
    // this.loadCharts();
  }
}
