import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CatalogosService } from '../../../shared/services/catalogos.service';
import { FormBuilder } from '@angular/forms';
import { Catalogos } from '../../../shared/interfaces/catalogos.interface';
import { DatosActa } from '../../interfaces/actas.interface';
import { ActasService } from '../../services/actas.service';
import { ScrollButtonComponent } from '../../../shared/components/scroll-button/scroll-button.component';

declare var $:any;

@Component({
  selector: 'distrital-actas-jornada',
  templateUrl: './actas-jornada.component.html',
  styleUrl: './actas-jornada.component.css'
})
export class ActasJornadaComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  private catalogosService = inject(CatalogosService);
  private actasService = inject(ActasService);


  @Input()
  public datos_acta?:DatosActa;

  public myForm = this.fb.group({
    id_seccion:[''],
    tipo_casilla:[''],
    personas_votaron:[''],
    votos_sacados_magistraturas_tdj:[''],
    votos_sacados_magistraturas_pj:[''],
    votos_sacados_juzgados_pj:[''],
    punto_escrutinio:['']
  })

  public tipos_eleccion:Catalogos[] = [];
  public puntos_escrutinio:Catalogos[] = [];

  ngOnInit(): void {
    for(let i = 1; i < 5; i++) {
      this.puntos_escrutinio.push({id:i.toString(),descripcion:i.toString()});
    }
    this.getTiposEleccion()
  }

  ngOnChanges(): void {
    if(this.datos_acta !== undefined) {
      this.getDatosActa();
    }
  }

  getTiposEleccion() {
    this.catalogosService.getCatalogo('tipo-eleccion')
    .subscribe(res => {
      this.tipos_eleccion = res.datos as Catalogos[];
    })
  }

  getDatosActa() {
    return this.actasService.getActas(this.datos_acta!,this.datos_acta?.tipo_eleccion!, 'actaInfo')
    .subscribe(res => {
      console.log(res.datos);
    })
  }

  closeModal() {
    $('#actasJornada').modal('hide');
    this.datos_acta = undefined;
  }
}
