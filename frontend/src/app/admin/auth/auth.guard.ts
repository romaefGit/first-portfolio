import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/** Reemplaza el `.run()` de client/admin/app.js. */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  if (auth.isAuthenticated()) return true;
  auth.logout();
  return inject(Router).createUrlTree(['/admin/login']);
};

/** Si ya hay sesión no tiene sentido mostrar el login. */
export const guestGuard: CanActivateFn = () => {
  return inject(AuthService).isAuthenticated() ? inject(Router).createUrlTree(['/admin/inicio']) : true;
};
