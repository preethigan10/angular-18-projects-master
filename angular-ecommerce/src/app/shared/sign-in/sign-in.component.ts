import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../model/interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../../services/alert.service';
import { ClickOutsideDirective } from '../custom-directives/click-outside.directive';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent, ClickOutsideDirective],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  user: any = {
    email: '',
    password: ''
  };
  showPassword = false;
  @Input() isVisible: boolean = true;
  @Output() closePopup = new EventEmitter<void>();
  @Output() openSignUp = new EventEmitter<void>();
  authService = inject(AuthService);
  alertService = inject(AlertService);

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
    if (!user.email || !user.password) {
      alert('Please fill in all fields');
      return;
    }
    this.authService.validateUser(user.email, user.password).subscribe({
      next: (res: any) => {
        if (res.length === 0) {
          this.alertService.show('danger', 'User not found');
        } else if (res[0].password !== user.password) {
          this.alertService.show('danger', 'Invalid Password');
        } else {
          this.authService.login(user);
          this.alertService.show('success', 'Logged in successfully!');
          this.close();
        }
      },
      error: (err: any) => {
        this.alertService.show('danger', 'Server error');
      },
    });
  }
}
