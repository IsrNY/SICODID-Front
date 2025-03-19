import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'auth-confirm-login',
  templateUrl: './confirm-login.component.html',
  styleUrl: './confirm-login.component.css'
})
export class ConfirmLoginComponent {
  private fb = inject(FormBuilder);

  public myForm = this.fb.group({
    usuario: ['', [Validators.required]],
    contrasena: ['', [Validators.required]]
  });

  close() {
    $('#confirmLoginModal').modal('hide');
    this.myForm.reset();
    this.myForm.markAsPristine();
    this.myForm.markAsUntouched();
  }
}
