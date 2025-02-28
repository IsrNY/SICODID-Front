import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter, inject, OnInit } from '@angular/core';
import { Casillas } from '../../../shared/interfaces/catalogos.interface';
import { DtAttibService } from '../../../shared/services/dt-attib.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'distrital-tabla-actas',
  templateUrl: './tabla-actas.component.html',
  styles: ` {

  }
  `
})
// export class TablaActasComponent implements OnInit, OnChanges {
export class TablaActasComponent implements OnInit, OnChanges {
  private dtAttrib = inject(DtAttibService);

  @Input()
  public titulo:string = '';

  @Input()
  public datos: Casillas[] | undefined;

  @Input()
  public operacion:number = 0;

  @Input()
  public tipo_eleccion:number = 0;

  @Output()
  public tipo_operacion = new EventEmitter<number>();

  @Output()
  public datos_acta = new EventEmitter<Casillas>();

  public dtOptions:Config = {}

  ngOnInit(): void {
    this.dtOptions = this.dtAttrib.dtOptions;
  }

  ngOnChanges() {
    console.log('datos',this.datos)
  }

  getData(datos:Casillas):void {
    console.log(datos);
  }

  // private dtAttrib = inject(DtAttibService);

  // @Input()
  // public titulo:string = '';

  // @Input()
  // public actas:Casillas[] | undefined;

  // @Input()
  // public modo_acta:number = 0;

  // @Input()
  // public operacion:number = 0;

  // @Input()
  // public tipo_eleccion:number = 0;

  // @Output()
  // public tipo_operacion = new EventEmitter<number>();

  // @Output()
  // public acta = new EventEmitter<Casillas>();

  // public selected_row:number = 0;
  // public id_seccion:number = 0;
  // public dtOptions:Config = {};

  // ngOnInit(): void {
  //   this.dtOptions = this.dtAttrib.dtOptions;
  // }

  // ngOnChanges(): void {
  //   switch(this.tipo_eleccion) {
  //     default:
  //       this.selected_row = 0;
  //       this.id_seccion = 0;
  //   }
  // }

  // getData(acta: Casillas) {
  //   this.acta.emit(acta);
  // }

  // getOperacion(tipo_operacion:number) {
  //   this.tipo_operacion.emit(tipo_operacion)
  // }

  // getSelect(id_select:number, id_seccion:number) {
  //   this.selected_row = id_select;
  //   this.id_seccion = id_seccion;
  // }
}
