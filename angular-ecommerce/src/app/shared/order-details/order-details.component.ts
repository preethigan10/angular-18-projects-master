import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  selectedOrder: any = {
    id: 1,
    customer: 'John Doe', 
    items: [
      { name: 'Shirt', price: 500, quantity: 2 },
      { name: 'Shoes', price: 1200, quantity: 1 } ,
    ],
    total: 2200,
    status: 'Pending'
  };    

}
