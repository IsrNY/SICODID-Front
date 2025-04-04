import { Component, inject, OnInit } from '@angular/core';
import { CatalogosService } from '../../../shared/services/catalogos.service';
import { Catalogos } from '../../../shared/interfaces/catalogos.interface';

@Component({
  selector: 'distrital-gestion-actas-jornada-page',
  templateUrl: './gestion-actas-jornada-page.component.html',
  styles: ``
})
export class GestionActasJornadaPageComponent implements OnInit {
  private catalogosService = inject(CatalogosService);

  public tipo_eleccion:Catalogos[] = [];

  ngOnInit(): void {
    this.getTiposEleccion();
  }

  getTiposEleccion() {
    this.catalogosService.getCatalogo('tipo-eleccion')
    .subscribe(res => {
      this.tipo_eleccion = res.datos as Catalogos[];
    })
  }

  getListaPorCapturar() {

  }

  getLiistaCapturadas() {
    
  }
}
