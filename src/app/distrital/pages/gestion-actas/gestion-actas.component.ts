import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActasService } from '../../services/actas.service';
import { CatalogosService } from '../../../shared/services/catalogos.service';
import { Casillas, Catalogos } from '../../../shared/interfaces/catalogos.interface';
import { Contador } from '../../interfaces/contador.interface';
import { DatosActa } from '../../interfaces/actas.interface';


declare var $:any;

@Component({
  selector: 'distrital-gestion-actas',
  templateUrl: './gestion-actas.component.html',
  styles: `
    .fixed {
      position: sticky;
      top:88px;
      border-radius: 5px;
    }
  `
})
export class GestionActasComponent implements OnInit {
  private fb = inject(FormBuilder);
  private actasService = inject(ActasService);
  private catalogosService = inject(CatalogosService);

  public myForm = this.fb.group({
    tipo_eleccion:['', [Validators.required]]
  });

  public tipo_eleccion:Catalogos[] = [];
  public contador?:Contador;
  public actas_por_capturar?: Casillas[] | undefined;
  public actas_capturadas?: Casillas[] | undefined;
  public datos_acta:DatosActa | undefined

  get eleccion(): number {
    return +this.myForm.get('tipo_eleccion')?.value!;
  }

  ngOnInit(): void {
    this.getTipoEleccion();
    this.getDataContador();
    this.myForm.patchValue({tipo_eleccion:'1'});
    this.getListasActas();
  }

  getTipoEleccion() {
    this.catalogosService.getCatalogo('tipo-eleccion')
    .subscribe(res => {
      this.tipo_eleccion = res.datos as Catalogos[];
    })
  }

  getDataContador() {
    this.catalogosService.getContador('contadorOperaciones')
    .subscribe(res => {
      console.log(res)
      this.contador = res.datos as Contador;
    });
  }

  getListasActas() {
    this.actas_por_capturar = undefined;
    this.catalogosService.getCatalogo(`actasNoRegistradas?id_tipo_eleccion=${this.myForm.get('tipo_eleccion')?.value}`)
    .subscribe(res => {
      this.actas_por_capturar = res.datos as Casillas[];
    })
    this.actas_capturadas = undefined;
    this.catalogosService.getCatalogo(`actasRegistradas?id_tipo_eleccion=${this.myForm.get('tipo_eleccion')?.value}`)
    .subscribe(res => {
      this.actas_capturadas = res.datos as Casillas[];
    })
  }

  getDatosActa(datos: DatosActa) {
    this.datos_acta = datos;
    $('#actas').modal('show');
  }

  getReload(reload:boolean) {
    if(reload) {
      this.getListasActas();
      this.getDataContador();
    }
  }

  getPath() {
    switch(this.eleccion) {
      
    }
  }
}
