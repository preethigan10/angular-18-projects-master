import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  @Input() isVisible: boolean = true;
  @Output() closePopup = new EventEmitter<void>();
  @Output() openSignIn = new EventEmitter<void>();

  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: 'customer',
    vendorName: '',
  };
  authService = inject(AuthService);
  showPassword = false;
  showConfirmPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goToLogin() {
    this.isVisible = false;
    this.openSignIn.emit();
  }

  close(): void {
    this.isVisible = false;
    this.closePopup.emit();
  }

  createAccount(user: User) {
    this.authService.addNewUser(user);
    this.close();
  }
}
