export class Product {

    "id": number;
    "vendorId": number;
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
}


export class Order {
    "id": number;
    "customerId": number;
    "customerName": string;
    "address": string;
    "items": Items[];
    "total": number;
    "status": 'Pending' | 'Shipped' | 'Delivered';                    

    constructor() {
        this.id = 0;
        this.customerId = 0;
        this.customerName = '';
        this.address = '';
        this.items = [];
        this.total = 0;
        this.status = 'Pending';
    }
}

export class Items {
    "productId": number;
    "vendorId": number;
    "name": string;
    "price": number;
    "qty": number;

    constructor() {
        this.productId = 0;
        this.vendorId = 0;
        this.name = '';
        this.price = 0;
        this.qty = 0;
    }
}