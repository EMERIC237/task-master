import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.isLoggedIn();

  if (!isLoggedIn) {
    console.log('Redirecting to login...');
    return router.createUrlTree(['/login']);
  }
  return true;
};
 