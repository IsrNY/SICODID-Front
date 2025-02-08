import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { DbStatusComponent } from './components/db-status/db-status.component';
import { ComputoComponent } from './components/computo/computo.component';
import { RegistroIncidentesComponent } from './components/registro-incidentes/registro-incidentes.component';
import { ActasComponent } from './components/actas/actas.component';
import { GruposTrabajoComponent } from './components/grupos-trabajo/grupos-trabajo.component';
import { ReportesComponent } from './components/reportes/reportes.component';

const routes: Routes = [
  {
    path: 'status',
    component:LayoutPageComponent,
    children: [
      {
        path: 'data_base',
        component:DbStatusComponent
      },
      {
        path:'**',
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
        component:ComputoComponent
      },
      {
        path:'cierre_computo',
        component:ComputoComponent
      }
    ]
  },
  {
    path:'procesos',
    component:LayoutPageComponent,
    children: [
      {
        path:'registro_incidentes',
        component:RegistroIncidentesComponent
      },
      {
        path:'actas',
        component:ActasComponent
      },
      {
        path:'grupos_trabajo',
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
