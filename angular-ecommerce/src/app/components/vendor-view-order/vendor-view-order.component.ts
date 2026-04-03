import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../model/interface';

@Component({
  selector: 'app-vendor-view-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendor-view-order.component.html',
  styleUrl: './vendor-view-order.component.css',
})
export class VendorViewOrderComponent {
  @Input() order: Order | null = null;
  @Output() close = new EventEmitter<void>();

  closeModal() {
     this.close.emit();
  }
}
