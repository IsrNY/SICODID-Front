import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollButtonComponent } from './components/scroll-button/scroll-button.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    ScrollButtonComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ScrollButtonComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
