import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../model/interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: 'customer',
    vendorName: ''
  };
  showPassword = false;
  @Input() isVisible: boolean = true;
  @Output() closePopup = new EventEmitter<void>();
  @Output() openSignUp = new EventEmitter<void>();
  authService = inject(AuthService);

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goToSignup() {
    this.isVisible = false;
    this.openSignUp.emit();
  }

  close(): void {
    this.isVisible = false;
    this.closePopup.emit();
  }

  userSignIn(user: User) {
    this.authService.login(user);
    this.close();
  }

  
}
