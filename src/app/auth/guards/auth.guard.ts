import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { VerifyService } from '../services/verify.service';
import { tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const verificaService = inject(VerifyService);

  return verificaService.checkAuthentication()
  .pipe(
    tap(isAuthenticated => {
      if(!isAuthenticated) {
        router.navigateByUrl('auth');
        return false;
      }
      return true;
    })
  )
};
