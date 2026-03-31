import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  productForm: FormGroup;
  products: any[] = [];
  showAddProduct = false;
  fb = inject(FormBuilder);

   constructor() {
    this.productForm = this.fb.group(
      {
        name: [''],
        price: [''],
        stock: [''],
        category: [''],
        image: [''],
        available: [true]

      });
   }  

  saveProduct() {
    if (this.productForm.invalid) return;

    this.products.push(this.productForm.value);
    this.showAddProduct = false;
  }

  onImageUpload(  event: any) {

  }
}
