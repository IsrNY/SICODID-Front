import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistritalRoutingModule } from './distrital-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
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
import { TablaActasComponent } from './components/tabla-actas/tabla-actas.component';
import { GestionActasJornadaPageComponent } from './pages/gestion-actas-jornada-page/gestion-actas-jornada-page.component';
import { TablaActasJornadaComponent } from './components/tabla-actas-jornada/tabla-actas-jornada.component';
import { ActasJornadaComponent } from './components/actas-jornada/actas-jornada.component';
import { InicioCierreOperacionesPageComponent } from './pages/inicio-cierre-operaciones-page/inicio-cierre-operaciones-page.component';



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
    TablaActasComponent,
    GestionActasJornadaPageComponent,
    TablaActasJornadaComponent,
    ActasJornadaComponent,
    InicioCierreOperacionesPageComponent,
    ],
  imports: [
    CommonModule,
    DistritalRoutingModule,
    SharedModule,
    DataTablesModule,
    ReactiveFormsModule,
    AuthModule
  ]
})
export class DistritalModule { }
