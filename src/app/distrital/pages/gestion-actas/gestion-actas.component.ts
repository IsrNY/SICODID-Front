import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { CatalogosService } from '../../../shared/services/catalogos.service';
import { Casillas, Catalogos } from '../../../shared/interfaces/catalogos.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { ActasService } from '../../services/actas.service';
import { Actas } from '../../interfaces/actas.interface';
import { Contador } from '../../interfaces/contador.interface';
import { ValidatorsService } from '../../../shared/services/validators.service';

declare var $:any;

@Component({
  selector: 'distrital-gestion-actas',
  templateUrl: './gestion-actas.component.html',
  styles: `
    .fixed {
      position: sticky;
      top:90px;
    }
  `
})
export class GestionActasComponent implements OnInit, OnChanges {
  private catalogosService = inject(CatalogosService);
  private fb = inject(FormBuilder);
  private actasService = inject(ActasService);

  public myForm = this.fb.group({
    tipo_eleccion:['', [Validators.required]]
  })

  public tipo_eleccion:Catalogos[] = [];
  public actas_por_capturar: Casillas[] | undefined;
  public actas_capturadas: Casillas[] | undefined;
  public tipo_operacion:number = 0;
  public eleccion:number = 0;
  public acta?:Casillas;
  public actas?:Actas;
  public contador?:Contador;

  ngOnInit(): void {
    this.getTipoEleccion();
    this.getDatosContador();
  }

  ngOnChanges(): void {
  }

  getTipoEleccion() {
    this.catalogosService.getCatalogo('tipo-eleccion')
    .subscribe(res => {
      this.tipo_eleccion = res.datos as Catalogos[];
    })
  }

  getDatosContador() {
    this.contador = undefined;
    this.catalogosService.getContador()
    .subscribe(res => {
      this.contador = res.datos as Contador;
      console.log(res.datos)
    })
  }

  getActasPorCapturar() {
    this.actas_por_capturar = undefined;
    this.catalogosService.getCatalogo(`actasNoRegistradas?id_tipo_eleccion=${this.myForm.get('tipo_eleccion')?.value!}`)
    .subscribe(res => {
      this.actas_por_capturar = res.datos as Casillas[];
    })
  }

  getActasCapturadas() {
    this.actas_capturadas = undefined;
    this.catalogosService.getCatalogo(`actasRegistradas?id_tipo_eleccion=${this.myForm.get('tipo_eleccion')?.value!}`)
    .subscribe(res => {
      this.actas_capturadas = res.datos as Casillas[];
    })
  }

  getActa(acta:Casillas) {
    this.acta = acta;
  }

  getOperacion(tipo_operacion:number) {
    this.eleccion = +this.myForm.get('tipo_eleccion')?.value!;
    this.tipo_operacion = tipo_operacion;
    this.actasService.getActas(this.acta!,this.eleccion)
    .subscribe(res => {
      this.actas = res.datos as Actas;
    })
    $('#actas').modal('show');
  }

  getReload(reload:boolean) {
    if(reload) {
      this.getActasCapturadas();
      this.getActasPorCapturar();
      this.getDatosContador();
    }
  }
}
