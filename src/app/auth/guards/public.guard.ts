import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { VerifyService } from '../services/verify.service';
import { map, tap } from 'rxjs';

export const PublicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const verificaService = inject(VerifyService);
  const router = inject(Router);
  const rol = authService.rol;

  return verificaService.checkAuthentication()
  .pipe(
    tap(isAuthenticated => {
      if(isAuthenticated) {
        if(rol) {
          router.navigateByUrl('distrital');
        }
      } else {
        authService.clearStorage();
      }
    }),
    map(isAuthenticated => !isAuthenticated)
  )
};
