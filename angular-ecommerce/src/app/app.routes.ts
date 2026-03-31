import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';
import { vendorAuthGuard } from './guards/vendor-auth.guard';
import { CheckOutComponent } from './components/check-out/check-out.component';

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
        path: 'vendor-dashboard',
        component: VendorDashboardComponent,
        canActivate: [vendorAuthGuard] 
    },
    {
        path: 'checkout',
        component: CheckOutComponent
    }
];
