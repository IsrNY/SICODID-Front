import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistritalRoutingModule } from './distrital-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { DbStatusComponent } from './components/db-status/db-status.component';
import { ComputoComponent } from './components/computo/computo.component';
import { RegistroIncidentesComponent } from './components/registro-incidentes/registro-incidentes.component';
import { GruposTrabajoComponent } from './components/grupos-trabajo/grupos-trabajo.component';
import { ActasComponent } from './components/actas/actas.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { IncidentesPageComponent } from './pages/incidentes-page/incidentes-page.component';
import { GestionActasComponent } from './pages/gestion-actas/gestion-actas.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    DbStatusComponent,
    ComputoComponent,
    RegistroIncidentesComponent,
    GruposTrabajoComponent,
    ActasComponent,
    ReportesComponent,
    IncidentesPageComponent,
    GestionActasComponent,
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
