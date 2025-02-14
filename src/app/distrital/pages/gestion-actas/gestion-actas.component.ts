import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { CatalogosService } from '../../../shared/services/catalogos.service';
import { Casillas, Catalogos } from '../../../shared/interfaces/catalogos.interface';
import { FormBuilder, Validators } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'distrital-gestion-actas',
  templateUrl: './gestion-actas.component.html',
  styles: ``
})
export class GestionActasComponent implements OnInit, OnChanges {
  private catalogosService = inject(CatalogosService);
  private fb = inject(FormBuilder);

  public myForm = this.fb.group({
    tipo_eleccion:['', [Validators.required]]
  })

  public tipo_eleccion:Catalogos[] = [];
  public actas_por_capturar: Casillas[] | undefined;
  public actas_capturadas: Casillas[] | undefined;
  public tipo_operacion:number = 0;
  public acta?:Casillas;

  ngOnInit(): void {
    this.getTipoEleccion();
  }

  ngOnChanges(): void {
    console.log(this.acta,this.tipo_eleccion);
  }

  getTipoEleccion() {
    this.catalogosService.getCatalogo('tipo-eleccion')
    .subscribe(res => {
      this.tipo_eleccion = res.datos as Catalogos[];
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
    $('#actas').modal('show');
  }
}
