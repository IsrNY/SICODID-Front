import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentralRoutingModule } from './central-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { DeleteActasComponent } from './components/delete-actas/delete-actas.component';


@NgModule({
  declarations: [
    MainPageComponent,
    DeleteActasComponent
  ],
  imports: [
    CommonModule,
    CentralRoutingModule
  ]
})
export class CentralModule { }
