import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { DbStatusComponent } from './components/db-status/db-status.component';

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
      // {

      // },
      // {

      // }
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
