import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../model/interface';
import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator } from '../validators/custom-validators';
import { AlertComponent } from "../alert/alert.component";
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, AlertComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnDestroy {
  @Input() isVisible: boolean = true;
  @Output() closePopup = new EventEmitter<void>();
  @Output() openSignIn = new EventEmitter<void>();

  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: 'customer'
  };
  authService = inject(AuthService);
  showPassword = false;
  showConfirmPassword = false;
  private fb = inject(FormBuilder);
  signupForm: FormGroup;
  alertService = inject(AlertService);

  constructor() {
    this.signupForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: [passwordMatchValidator], // Apply the custom validator here
      },
    );
  }

  get f() {
    return this.signupForm.controls;
  }

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
    this.signupForm.reset();
  }

  createAccount() {
    if (this.signupForm.invalid) {
      return;
    }
    this.user.name = this.signupForm.value.name;
    this.user.email = this.signupForm.value.email;
    this.user.password = this.signupForm.value.password;
    this.authService.addNewUser(this.user);
    this.alertService.show('success', 'Account created successfully! Please log in.');
    this.close();
  }

  ngOnDestroy(): void {
    this.signupForm.reset();
  }
}
