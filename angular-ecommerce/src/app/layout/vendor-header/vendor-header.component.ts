import { Component, inject } from '@angular/core';
import { AlertComponent } from '../../shared/alert/alert.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vendor-header',
  standalone: true,
  imports: [AlertComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './vendor-header.component.html',
  styleUrl: './vendor-header.component.css',
})
export class VendorHeaderComponent {
  showDropdown = false;
  user: any;
  active = 'dashboard';
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  goTo(page: string) {
    this.active = page;
    this.showDropdown = false;
  }


  logout() {
    this.authService.userSignal.set(null);
    this.router.navigate(['/']);
  }
}
