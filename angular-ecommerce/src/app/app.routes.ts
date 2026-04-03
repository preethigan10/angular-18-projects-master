import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';
import { vendorAuthGuard } from './guards/vendor-auth.guard';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { VendorProductsComponent } from './components/vendor-products/vendor-products.component';
import { VendorOrdersComponent } from './components/vendor-orders/vendor-orders.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomePageComponent
        // loadComponent: () => import('./homepage.component').then(m => m.HomePageComponent)
    },
    {
        path: 'product/:id',
        component: ProductDetailsComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'checkout',
        component: CheckOutComponent
    },
    {
        path: 'vendor-dashboard',
        component: VendorDashboardComponent,
        canActivate: [vendorAuthGuard] 
    },
    {
        path: 'vendor/products',
        component: VendorProductsComponent,
        canActivate: [vendorAuthGuard] 
    },
    {
        path: 'vendor/orders',
        component: VendorOrdersComponent,
        canActivate: [vendorAuthGuard] 
    }
];
