import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IncidentesService } from '../../services/incidentes.service';
import { Incidente } from '../../interfaces/incidentes.interface';

declare var $:any;

@Component({
  selector: 'distrital-incidentes-page',
  templateUrl: './incidentes-page.component.html',
  styleUrl: './incidentes-page.component.css'
})
export class IncidentesPageComponent implements OnInit, OnChanges {
  private incidenttesService = inject(IncidentesService);

  ngOnInit(): void {
    this.getListaIncidentes();
  }

  ngOnChanges(): void {
    console.log(this.opcion);
  }

  public incidentes:Incidente[] | undefined;
  public incidente!:Incidente;
  public show_modal:boolean = false;
  public opcion:number = 0;

  getListaIncidentes() {
    this.incidenttesService.getIncidentes()
    .subscribe(res => {
      this.incidentes = res.datos as Incidente[];
    })
  }

  getReset(opcion:number) {
    console.log(opcion)
    if(opcion == 0) {
      this.getListaIncidentes();
    }
  }

  openModal(id_incidente:number, id_opcion:number) {
    if(id_incidente !== 0) {
      this.incidentes!.filter(incidente => {
        if(id_incidente == incidente.id_incidente) {
          this.incidente = incidente
        }
      })
    }
    $('#incidentes').modal('show');
    this.opcion = id_opcion;
  }

  
}
