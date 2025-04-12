import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { DbStatusComponent } from './components/db-status/db-status.component';
import { ComputoComponent } from './components/computo/computo.component';
import { RegistroIncidentesComponent } from './components/registro-incidentes/registro-incidentes.component';
import { ActasComponent } from './components/actas/actas.component';
import { GruposTrabajoComponent } from './components/grupos-trabajo/grupos-trabajo.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { IncidentesPageComponent } from './pages/incidentes-page/incidentes-page.component';
import { GestionActasComponent } from './pages/gestion-actas/gestion-actas.component';
import { verifyGuard } from '../auth/guards/verify.guard';
import { GestionActasJornadaPageComponent } from './pages/gestion-actas-jornada-page/gestion-actas-jornada-page.component';
import { InicioCierreOperacionesPageComponent } from './pages/inicio-cierre-operaciones-page/inicio-cierre-operaciones-page.component';

const routes: Routes = [
  {
    path: 'status',
    canActivate:[verifyGuard],
    component:LayoutPageComponent,
    children: [
      {
        path: 'data_base',
        canActivate:[verifyGuard],
        component:DbStatusComponent,
      },
      {
        path:'**',
        // canActivate:[verifyGuard],
        redirectTo:'data_base'
      }
    ]
  },
  {
    path:'computo',
    component:LayoutPageComponent,
    children: [
      {
        path:'inicio_computo',
        canActivate:[verifyGuard],
        component:ComputoComponent
      },
      {
        path:'cierre_computo',
        canActivate:[verifyGuard],
        component:ComputoComponent
      },
      {
        path:'operaciones',
        canActivate:[verifyGuard],
        component:InicioCierreOperacionesPageComponent
      }
    ]
  },
  {
    path:'procesos',
    component:LayoutPageComponent,
    children: [
      {
        path:'registro_incidentes',
        canActivate:[verifyGuard],
        component:IncidentesPageComponent
      },
      {
        path:'hojas_operaciones',
        canActivate:[verifyGuard],
        component:GestionActasComponent
      },
      {
        path:'actas_jornada',
        canActivate:[verifyGuard],
        component:GestionActasJornadaPageComponent
      },
      {
        path:'grupos_trabajo',
        canActivate:[verifyGuard],
        component:GruposTrabajoComponent
      }
    ]
  },
  {
    path:'reportes',
    component:LayoutPageComponent,
    children: [
      {
        path:'reportes_generales',
        canActivate:[verifyGuard],
        component:ReportesComponent
      }
    ]
  },
  {
    path:'**',
    redirectTo:'status'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistritalRoutingModule { }
