import { Component, inject, OnInit } from '@angular/core';
import { CatalogosService } from '../../../shared/services/catalogos.service';
import { Catalogos } from '../../../shared/interfaces/catalogos.interface';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'distrital-gestion-actas-jornada-page',
  templateUrl: './gestion-actas-jornada-page.component.html',
  styles: `
    .fixed {
      position: sticky;
      top:88px;
      // background-color:lightgray;
      border-radius: 5px;
    }
  `
})
export class GestionActasJornadaPageComponent implements OnInit {
  private catalogosService = inject(CatalogosService);
  private fb = inject(FormBuilder);

public myForm = this.fb.group({
  tipo_eleccion:['']
})

  public tipo_eleccion:Catalogos[] = [];

  ngOnInit(): void {
    this.getTiposEleccion();
    this.getContador();
  }

  getTiposEleccion() {
    this.catalogosService.getCatalogo('tipo-eleccion')
    .subscribe(res => {
      this.tipo_eleccion = res.datos as Catalogos[];
    })
  }

  getContador() {
    this.catalogosService.getContador('contadorActas')
    .subscribe(res => {
      console.log(res.datos);
    })
  }

  getListaPorCapturar() {

  }

  getLiistaCapturadas() {

  }
}
