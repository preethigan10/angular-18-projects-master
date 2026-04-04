import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const vendorAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  
  if (authService.isAuthenticated || authService.userSignal()) {
    return true;
  } else {
    router.navigate(['/404']); 
    return false;
  }
};
