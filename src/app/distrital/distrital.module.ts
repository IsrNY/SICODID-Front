import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistritalRoutingModule } from './distrital-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { DbStatusComponent } from './components/db-status/db-status.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    DbStatusComponent
  ],
  imports: [
    CommonModule,
    DistritalRoutingModule,
    SharedModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class DistritalModule { }
