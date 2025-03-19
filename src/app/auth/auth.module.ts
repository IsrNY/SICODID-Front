import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { ConfirmLoginComponent } from './components/confirm-login/confirm-login.component';



@NgModule({
  declarations: [
    LoginComponent,
    ConfirmLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [ConfirmLoginComponent]  // para que pueda ser usado en otros modulos
})
export class AuthModule { }
