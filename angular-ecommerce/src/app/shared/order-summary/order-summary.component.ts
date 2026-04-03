import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SignInComponent } from "../sign-in/sign-in.component";
import { AlertService } from '../../services/alert.service';
import { SignUpComponent } from "../sign-up/sign-up.component";

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [SignInComponent, SignUpComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
  @Input() totalItems!: number;
  @Input() totalPrice!: number;
  @Input() buttonText: string = 'Checkout';
  @Input() buttonDisabled: boolean = false;
  @Output() onClick = new EventEmitter<void>();
  isVisible = false;
  authService = inject(AuthService);
  router = inject(Router);
  signInModal = false;
  signUpModal = false;

  openPopup(): void {
    this.signInModal = true;
  }

  proceed() {
    // goTocheckOut
    if (this.buttonText == 'Proceed To Checkout') {
      if (this.authService.userSignal() == null) {
        this.openPopup();
      } else {
        this.router.navigate(['/checkout']);
      }
    } else if (this.buttonText == 'Place Order') {
      this.onClick.emit();
    }
  }
}
