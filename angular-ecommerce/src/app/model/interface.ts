export class Product {

    "id": number;
    "title": string;
    "price": number;
    "category": string;
    "description": string;
    "image": string;
    "inStock": boolean;
    "rating": number;
    "quantity": number;
    "cartQty": number;

    constructor() {
        this.id = 0;
        this.title = '';
        this.price = 0;
        this.category = '';
        this.description = '';
        this.image = '';
        this.inStock = true;
        this.rating = 0;
        this.quantity = 0;
        this.cartQty = 0;
    }
} 



export class Cart {
    "id": number;
    "items": Array<any>;
    "subTotal": number;

    constructor() {
        this.id = 0;
        this.items = [];
        this.subTotal = 0;
    }
}


export interface Alert {
  type: 'success' | 'danger' | 'info';
  message: string;
}


export interface User {
    id: number;
    name: string;
    email: any;
    password: any;
    role: 'vendor' | 'customer';
    vendorName: string;
}