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
    }
} 