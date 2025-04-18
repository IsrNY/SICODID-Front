import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  get inicio_computo():boolean {
    return localStorage.getItem('inicio')! == 'true' ? true : false;
  }

  get cierre_computo():boolean {
    return localStorage.getItem('cierre')! == 'true' ? true : false;
  }

  ngOnInit(): void {
  }
}
