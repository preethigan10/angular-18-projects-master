import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../model/interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vendor-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vendor-add-product.component.html',
  styleUrl: './vendor-add-product.component.css',
})
export class VendorAddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  alertService = inject(AlertService);
  fb = inject(FormBuilder);
  categories: string[] = [];
  productService = inject(ProductsService);
  authService = inject(AuthService);
  @Input() product: Product | null = null;
  @Output() productAdded = new EventEmitter<Product>();
  @Output() close = new EventEmitter<void>();
  vendorId: number = 0;
  allProducts: Product[] = [];

  ngOnInit(): void {
    this.vendorId = Number(this.authService.userSignal().id);
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
    });

    // add form
    this.addProductForm = this.fb.group({
      title: ['', Validators.required],
      category: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      image: [''],
      description: [''],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      inStock: [true],
    });

    this.productService.getProducts().subscribe((res: any) => {
      this.allProducts = res;
    });
  }

  get f() {
    return this.addProductForm.controls;
  }

  addProduct() {
    // add product details and close modal
    if (this.addProductForm.valid == false) {
      this.alertService.show('danger', 'Please fill all required fields');
      return;
    }
    if (this.addProductForm.value.quantity == 0) {
      this.addProductForm.patchValue({ inStock: false });
    } else {
      this.addProductForm.patchValue({ inStock: true });
    }
    const maxId = Math.max(...this.allProducts.map((p) => p.id || 0));
    const newId = maxId + 1;
    const product = {
      id: newId,
      vendorId: this.vendorId,
      ...this.addProductForm.value,
    };
    this.productService.addProduct(product).subscribe(() => {
      this.close.emit();
      this.productAdded.emit();
      this.alertService.show('success', 'Product Added successfully');
    });
  }
}
