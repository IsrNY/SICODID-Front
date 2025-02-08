import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollButtonComponent } from './components/scroll-button/scroll-button.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';




@NgModule({
  declarations: [
    ScrollButtonComponent,
    HeaderComponent,
    SidebarComponent,
    LogoutButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ScrollButtonComponent,
    HeaderComponent,
    SidebarComponent,
    LogoutButtonComponent
  ]
})
export class SharedModule { }
