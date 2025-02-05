import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollButtonComponent } from './components/scroll-button/scroll-button.component';
import { HeaderComponent } from './components/header/header.component';




@NgModule({
  declarations: [
    ScrollButtonComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ScrollButtonComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
