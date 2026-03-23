import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.css',
})
export class VendorDashboardComponent {
  products = [
    { title: 'Shirt', price: 500, quantity: 10, image: '...' },
    { title: 'Shoes', price: 1200, quantity: 5, image: '...' },
  ];

  addProduct() {
    // open form modal
  }

  delete(p: any) {
    this.products = this.products.filter((item) => item !== p);
  }
}
