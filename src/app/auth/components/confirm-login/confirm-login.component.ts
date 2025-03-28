import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { VerifyService } from '../../services/verify.service';
import { User } from '../../interfaces/user.interface';

declare var $:any;

@Component({
  selector: 'auth-confirm-login',
  templateUrl: './confirm-login.component.html',
  styleUrl: './confirm-login.component.css'
})
export class ConfirmLoginComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);
  private verifyService = inject(VerifyService);

  public myForm = this.fb.group({
    usuario: ['', [Validators.required]],
    contrasena: ['', [Validators.required]]
  });

  @Input()
  public reset_value: number = 0;

  @Output()
  public success = new EventEmitter<boolean>();

  ngOnChanges(): void {
    // switch(this.reset_value) {
    //   default:
    //     this.myForm.reset();
    //   break;
    // }
  }

  closeLogin() {
    $('#confirmLoginModal').modal('hide');
    this.myForm.markAsUntouched();
    this.myForm.reset();
  }

  login() {
    if(this.myForm.invalid) {
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'Todos los campos marcados como obligatorios deben contener la información solicitada.',
        confirmButtonText:'Entendido'
      }).then(() => {
        this.myForm.markAllAsTouched();
      })
      return;
    }

    this.authService.login(this.myForm.value as User)
    .subscribe(res => {
      Swal.fire({
        icon:res.success ? 'success' : 'error',
        title:res.success ? '¡Correcto!' : '¡Error!',
        text:res.msg,
        showConfirmButton:false,
        timer:2000
      }).then(() => {
        if(res.success) {
                  // $('#confirmLoginModal').modal('hide');
        setTimeout(() => {
          setTimeout(() => {
            // this.myForm.reset();
            // this.myForm.markAsUntouched();
            this.closeLogin();
          },0)
          $('#close').focus();
        },300)
        }
      })
    })
    // if(this.myForm.get('usuario')?.value == 'Isra' && this.myForm.get('contrasena')?.value == '987654123') {
    //   Swal.fire({
    //     icon:'success',
    //     title:'¡Correcto!',
    //     text:'Se ha iniciado sesión correctamente.',
    //     showConfirmButton:false,
    //     timer:1500
    //   }).then(() => {
    //     // $('#confirmLoginModal').modal('hide');
    //     setTimeout(() => {
    //       setTimeout(() => {
    //         // this.myForm.reset();
    //         // this.myForm.markAsUntouched();
    //         this.closeLogin();
    //       },0)
    //       $('#close').focus();
    //     },300)
    //   })
    // } else {
    //   Swal.fire({
    //     icon:'error',
    //     title:'¡Error!',
    //     text:'Usuario y/o contraseña incorrectos.',
    //     confirmButtonText:'Entendido'
    //   }).then(() => {
    //     Swal.fire({
    //       icon:'question',
    //       title:'¿Confirmar limpieza?',
    //       text:'¿Desea limpiar los campos de usuario y contraseña?',
    //       showCancelButton:true,
    //       cancelButtonText:'Cancelar',
    //       confirmButtonText:'Confirmar'
    //     }).then((result) => {
    //       if(result.isConfirmed) {
    //         setTimeout(() => {
    //           (document.getElementById('close') as HTMLElement)?.focus() // Cambia el foco a un botón u otro elemento
    //         }, 200);
    //         this.myForm.get('usuario')?.setValue('');
    //         this.myForm.get('contrasena')?.setValue('');
    //       }
    //     })
    //   })
    // }
  }

  isValidField(field:string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldErrors(field:string) {
    return this.validatorsService.getFieldErrors(this.myForm, field);
  }
}
