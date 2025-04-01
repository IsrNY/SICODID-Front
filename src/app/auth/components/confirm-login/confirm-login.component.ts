import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { VerifyService } from '../../services/verify.service';
import { User } from '../../interfaces/user.interface';
import { SharedMethodsService } from '../../../shared/services/shared-methods.service';

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
  private sharedMethodsService = inject(SharedMethodsService);

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

  closeLogin(logout:boolean | undefined = undefined) {
    $('#confirmLoginModal').modal('hide');
    this.myForm.markAsUntouched();
    this.myForm.reset();
    if(logout) {
      this.authService.logout(true);
    }
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
        setTimeout(() => {
          setTimeout(() => {
            this.closeLogin();
          },0)
          $('#close').focus();
        },300)
        this.sharedMethodsService.setData(true);
        } else {
          this.sharedMethodsService.setData(false);
        }
      })
    })
  }

  isValidField(field:string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldErrors(field:string) {
    return this.validatorsService.getFieldErrors(this.myForm, field);
  }
}
