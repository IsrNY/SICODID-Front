import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm = this.fb.group({
    usuario:['', [Validators.required]],
    contrasena:['',[Validators.required]]
  })


  login() {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'Información requerida en todos los campos obligatorios.',
        confirmButtonText:'Entendido'
      })
      return;
    }

    this.authService.login(this.myForm.value as User)
    .subscribe(res => {
      Swal.fire({
        icon:res.success ? 'success' : 'error',
        title:res.success ? '¡ Correcto!' : '¡Error!',
        text:res.msg,
        showConfirmButton:false,
        timer:2200
      }).then(() => {
        if(res.success) {
          this.router.navigateByUrl('distrital');
        }
      })
    })
  }

  isValidField(field:string) {
    return this.validatorsService.isValidField(this.myForm,field);
  }

  getFieldErrors(field:string) {
    return this.validatorsService.getFieldErrors(this.myForm,field);
  }
}
