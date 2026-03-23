import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';

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
    }
];
