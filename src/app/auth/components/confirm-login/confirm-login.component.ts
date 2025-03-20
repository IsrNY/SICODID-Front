import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'auth-confirm-login',
  templateUrl: './confirm-login.component.html',
  styleUrl: './confirm-login.component.css'
})
export class ConfirmLoginComponent {
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);

  public myForm = this.fb.group({
    usuario: ['', [Validators.required]],
    contrasena: ['', [Validators.required]]
  });

  @Output()
  public success = new EventEmitter<boolean>();

  login() {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'Ambos campos del formulario de inicio de sesión deben contener los datos de las credenciales requeridos.',
        confirmButtonText:'Entendido'
      });
      return
    }

    this.authService.login(this.myForm.value as User, true)
    .subscribe(res => {
      Swal.fire({
        icon:res.success ? 'success' : 'error',
        title:res.success? '¡Correcto!' : '¡Error!',
        text:res.msg,
        showConfirmButton:false,
        timer:2200
      }).then(() => {
        if(res.success) {
          this.close();
        }
      })
    })
  }

  close(logout:boolean | undefined = undefined) {
    $('#confirmLoginModal').modal('hide');
    this.success.emit(true);
    // this.myForm.reset({usuario:'', contrasena:''});
    // this.myForm.markAsUntouched();
    if(logout) {
      this.authService.logout(); // Desloguear antes de cerrar el modal
    }
    // this.myForm.patchValue({usuario:'', contrasena:''});
  }

  isValidField(field:string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldErrors(field:string) {
    return this.validatorsService.getFieldErrors(this.myForm, field);
  }
}
