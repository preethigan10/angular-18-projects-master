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

export class ProductSelected {
    "id": number;
    "title": string;
    "price": number;
    "category": string;
    "image": string;
    "quantity": number;
     constructor() {
        this.id = 0;
        this.title = '';
        this.price = 0;
        this.category = '';
        this.image = '';
        this.quantity = 0;
    }
}