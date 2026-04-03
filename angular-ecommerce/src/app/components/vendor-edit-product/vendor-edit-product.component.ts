import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Product } from '../../model/interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vendor-edit-product.component.html',
  styleUrl: './vendor-edit-product.component.css',
})
export class VendorEditProductComponent {
  editProductForm!: FormGroup;
    alertService = inject(AlertService);
  fb = inject(FormBuilder);
  categories: string[] = [];
  productService = inject(ProductsService);
  @Input() product: Product | null = null;
  @Output() productUpdated = new EventEmitter<Product>();
  @Output() close = new EventEmitter<void>();

  ngOnInit() {
     // categories
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
    });

    // edit form
    this.editProductForm = this.fb.group({
      title: ['', Validators.required],
      category: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      image: [''],
      description: [''],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      inStock: [true],
    });
    
    this.editProductForm.patchValue(this.product || {});
  }



  updateProduct() {
      // update product details and close modal
      if (this.editProductForm.valid == false) {
        this.alertService.show('danger','Please fill all required fields');
        return;
      }
      if(this.editProductForm.value.quantity == 0){
        this.editProductForm.patchValue({inStock: false});
      } else {
        this.editProductForm.patchValue({inStock: true});
      }
      const updatedProduct = {
        ...this.product,
        ...this.editProductForm.value,
      };
      this.productService.updateProduct(updatedProduct).subscribe(() => {
        this.productUpdated.emit(updatedProduct);
        this.close.emit();
        this.alertService.show('success','Product updated successfully');
      });
    }

    
   get f() {
    return this.editProductForm.controls;
  }

  
  
}
