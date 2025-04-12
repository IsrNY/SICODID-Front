import { Component, inject, Input, OnInit } from '@angular/core';
import { CatalogosService } from '../../../shared/services/catalogos.service';
import { FormBuilder } from '@angular/forms';
import { Catalogos } from '../../../shared/interfaces/catalogos.interface';
import { DatosActa } from '../../interfaces/actas.interface';

declare var $:any;

@Component({
  selector: 'distrital-actas-jornada',
  templateUrl: './actas-jornada.component.html',
  styleUrl: './actas-jornada.component.css'
})
export class ActasJornadaComponent implements OnInit {
  private catalogosService = inject(CatalogosService);
  private fb = inject(FormBuilder);


  @Input()
  public datos_acta?:DatosActa;

  // public myForm = this.fb.group({
  //   tipo_eleccion:['']
  // })

  public myForm = this.fb.group({
    personas_votaron:[''],
    votos_sacados_magistraturas_tdj:[''],
    votos_sacados_magistraturas_pj:[''],
    votos_sacados_juzgados_pj:[''],
    punto_escrutinio:['']
  })

  public tipos_eleccion:Catalogos[] = [];

  ngOnInit(): void {
    this.getTiposEleccion()
  }

  getTiposEleccion() {
    this.catalogosService.getCatalogo('tipo-eleccion')
    .subscribe(res => {
      this.tipos_eleccion = res.datos as Catalogos[];
    })
  }

  closeModal() {
    $('#actasJornada').modal('hide');
  }
}
