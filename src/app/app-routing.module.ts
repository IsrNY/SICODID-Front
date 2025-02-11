import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate:[PublicGuard]
  },
  {
    path:'distrital',
    loadChildren: () => import('./distrital/distrital.module').then(m => m.DistritalModule),
    canActivate:[AuthGuard]
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
