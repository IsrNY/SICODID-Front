import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistritalRoutingModule } from './distrital-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    DistritalRoutingModule,
    SharedModule
  ]
})
export class DistritalModule { }
