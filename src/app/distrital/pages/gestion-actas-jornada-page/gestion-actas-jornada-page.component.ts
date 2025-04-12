import { Component, inject, OnInit } from '@angular/core';
import { CatalogosService } from '../../../shared/services/catalogos.service';
import { Casillas, Catalogos } from '../../../shared/interfaces/catalogos.interface';
import { FormBuilder } from '@angular/forms';
import { Contador } from '../../interfaces/contador.interface';
import { DatosActa } from '../../interfaces/actas.interface';

declare var $:any;

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
  public contador?:Contador;
  public actas_por_capturar: Casillas[] | undefined;
  public actas_capturadas: Casillas[] | undefined;
  public datos_acta:DatosActa | undefined

  ngOnInit(): void {
    this.getTiposEleccion();
    this.getContador();
    this.myForm.patchValue({tipo_eleccion:'1'});
    this.getListasActas();
  }

  get eleccion() {
    return +this.myForm.get('tipo_eleccion')?.value!;
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
      this.contador = res.datos as Contador;
    })
  }

  getDatosActas(datos: DatosActa) {
    this.datos_acta = datos;
    $('#actasJornada').modal('show');
  }

  getListasActas() {
    this.actas_por_capturar = undefined;
    this.catalogosService.getCatalogo(`actasJorNORegistradas?id_tipo_eleccion=${this.myForm.get('tipo_eleccion')?.value}`)
    .subscribe(res => {
      this.actas_por_capturar = res.datos as Casillas[];
      console.log(this.actas_por_capturar)
    })
    this.actas_capturadas = undefined;
    this.catalogosService.getCatalogo(`actasJorRegistradas?id_tipo_eleccion=${this.myForm.get('tipo_eleccion')?.value}`)
    .subscribe(res => {
      this.actas_capturadas = res.datos as Casillas[];
      console.log(this.actas_capturadas)
    })
  }
}
