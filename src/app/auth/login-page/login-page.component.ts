import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../shared/services/validators.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
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
    if(this.myForm.get('usuario')?.value == 'admin' && this.myForm.get('contrasena')?.value == '12345') {
      this.router.navigateByUrl('distrital');
    }
  }

  isValidField(field:string) {
    return this.validatorsService.isValidField(this.myForm,field);
  }

  getFieldErrors(field:string) {
    return this.validatorsService.getFieldErrors(this.myForm,field);
  }
}
