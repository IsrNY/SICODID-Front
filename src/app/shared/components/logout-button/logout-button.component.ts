import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'shared-logout-button',
  template: `
    <button class="btn btn-main" (click)="logout()"><i class="bi bi-box-arrow-right"></i> Cerrar sesión</button>
  `,
  styles: ``
})
export class LogoutButtonComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  logout() {
    Swal.fire({
      icon:'question',
      title:'¿Cerrar sesión?',
      text:'¿Está seguro/a de cerrar sesión y salir del sistema?',
      showCancelButton:true,
      cancelButtonText:'No',
      confirmButtonText:'Sí'
    }).then((result) => {
      if(result.isConfirmed) {
        this.authService.logout();
      }
    })
  }
}
