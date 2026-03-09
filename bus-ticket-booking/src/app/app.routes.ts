import { Routes } from '@angular/router';
import { BookTicketComponent } from './pages/book-ticket/book-ticket.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { SearchComponent } from './pages/search/search.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
    },
    {
        path: 'book-ticket',
        component: BookTicketComponent
    },
    {
        path: 'my-booking',
        component: MyBookingsComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'search-result/:fromId/:toId/:date',
        component: SearchResultComponent
    },

];
