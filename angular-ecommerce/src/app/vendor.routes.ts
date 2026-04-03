import { VendorDashboardComponent } from "./components/vendor-dashboard/vendor-dashboard.component";
import { VendorOrdersComponent } from "./components/vendor-orders/vendor-orders.component";
import { VendorProductsComponent } from "./components/vendor-products/vendor-products.component";

export const VENDOR_ROUTES = [
  {
    path: '',
    component: VendorDashboardComponent
  },
  {
    path: 'products',
    component: VendorProductsComponent
  },
  {
    path: 'orders',
    component: VendorOrdersComponent
  }
];