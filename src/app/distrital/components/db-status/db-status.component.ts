import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'distrital-db-status',
  templateUrl: './db-status.component.html',
  styles: ``
})
export class DbStatusComponent implements OnInit{
  private location = inject(Location);

  public ubicacion:string = '';
  ngOnInit(): void {
    this.ubicacion = this.location.path().split('/')[3];
  }
}
