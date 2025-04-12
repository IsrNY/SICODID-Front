import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { VerifyService } from '../services/verify.service';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';

declare var $:any;

export const verifyGuard: CanActivateFn = (route, state) => {
  const verifyService = inject(VerifyService);
  const authService = inject(AuthService);
  return true;

  // return verifyService.verifyToken()
  // .pipe(
  //   tap(isAuthenticated => {
  //     if(!isAuthenticated) {
  //       Swal.fire({
  //         icon:'warning',
  //         title:'¡Atención!',
  //         text:'El tiempo de su sesión ha expirado, para continuar es necesario proporcionar nuevamente sus credenciales de acceso',
  //         showCancelButton:true,
  //         cancelButtonText:'Cancelar',
  //         confirmButtonText:'Acceder'
  //       }).then(result => {
  //         if(result.isConfirmed) {
  //           $('#confirmLoginModal').modal('show');
  //         } else {
  //           authService.logout();
  //           return false;
  //         }
  //         return true;
  //       })
  //       return true;
  //     }
  //     return true;
  //   })
  // )
};
