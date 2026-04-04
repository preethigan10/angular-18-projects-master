import { Component, inject, OnInit } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { Order, User } from '../../model/interface';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../services/orders.service';
import { AlertService } from '../../services/alert.service';
import { VendorViewOrderComponent } from '../vendor-view-order/vendor-view-order.component';
import { StatusColorPipe } from '../../shared/custom-pipe/status-color.pipe';

@Component({
  selector: 'app-vendor-orders',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    VendorViewOrderComponent,
    StatusColorPipe
],
  templateUrl: './vendor-orders.component.html',
  styleUrl: './vendor-orders.component.css',
})
export class VendorOrdersComponent implements OnInit {
  vendorService = inject(VendorService);
  authService = inject(AuthService);
  orders: Order[] = [];
  totalSales = 0;
  totalOrders = 0;
  orderService = inject(OrdersService);
  alertService = inject(AlertService);
  allCustomers: User[] = [];
  selectedOrder = new Order();
  showViewOrderModal: boolean = false;

  vendorId: number = 0;
  ngOnInit(): void {
    this.vendorId = Number(this.authService.userSignal().id);
    //  users
    this.authService.getAllUsers().subscribe((data) => {
      this.allCustomers = data;
    });
    // orders
    this.loadOrders();
  }

  loadOrders() {
    // get all orders and filter items by vendorId, then calculate total for each order and overall total sales for the vendor
    this.vendorService.getOrdersByVendor().subscribe((data) => {
      this.orders = data
        .map((res) => {
          const customer = this.allCustomers.find(
            (c) => c.id == res.customerId,
          );
          const customerName = customer ? customer.name : '';
          const items = res.items.filter((i) => i.vendorId == this.vendorId);
          // console.log(items);
          if (items.length > 0) {
            return {
              ...res,
              items: items,
              total: items.reduce((sum, item) => sum + item.price * (item.qty || 1), 0),
              customerName: customerName,
            };
          } else {
            return null;
          }
        })
        .filter((o) => o != null);
      this.totalOrders = this.orders.length;
      this.totalSales = this.orders.reduce((sum, o) => sum + o.total, 0);
    });
  }

  viewOrder(order: Order) {
    this.selectedOrder = order;
    this.showViewOrderModal = true;
  }

  updateStatus(order: Order, event: any) {
    if (
      confirm(
        `Are you sure you want to change status of this product to ${event.target.value}?`,
      )
    ) {
      this.orderService
        .updateStatus(order, event.target.value)
        .subscribe(() => {
          this.alertService.show('success', 'Status Updated');
          this.loadOrders();
        });
    } else {
      this.loadOrders();
    }
  }
}
