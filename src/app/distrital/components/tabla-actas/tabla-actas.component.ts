import { Component, Input, OnChanges, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { Casillas } from '../../../shared/interfaces/catalogos.interface';
import { DtAttibService } from '../../../shared/services/dt-attib.service';
import { Config } from 'datatables.net';
import { DatosActa } from '../../interfaces/actas.interface';
import { ReportesDistritalesService } from '../../services/reportes-distritales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'distrital-tabla-actas',
  templateUrl: './tabla-actas.component.html',
  styles: `
  `
})
export class TablaActasComponent implements OnInit, OnChanges {
  private dtAttrib = inject(DtAttibService);
  private reportesDistritalesService = inject(ReportesDistritalesService);

  @Input()
  public titulo:string = '';

  @Input()
  public tipo_acta:number = 0;

  @Input()
  public datos: Casillas[] | undefined;

  @Input()
  public operacion:number = 0;

  @Input()
  public tipo_eleccion:number = 0;

  @Output()
  public tipo_operacion = new EventEmitter<number>();

  @Output()
  public datos_acta = new EventEmitter<DatosActa>();

  public dtOptions:Config = {};
  public selected_row:number = 0;
  public index:number = 0;

  ngOnInit(): void {
    this.dtOptions = this.dtAttrib.dtOptions;
  }

  ngOnChanges() {
  }

  getData(acta:Casillas, operacion:number, tipo_eleccion:number):void {
    this.datos_acta.emit({...acta, operacion,tipo_eleccion});
    this.selected_row = +acta.id_seccion;
  }

  getRowSelected(index:number,id:number):void {
    this.selected_row = id;
    this.index = index;
  }

  getPath() {
    switch(this.tipo_eleccion) {
      case 1:
        return 'actaLevantadaTribunal';
      case 2:
        return 'actaLevantadaMagistraturas';
      case 3:
        return 'actaLevantadaJuzgados';
    }
    return null;
  }

  downloadActa(acta:Casillas) {
    this.reportesDistritalesService.download(acta, this.getPath()!,1)
    .subscribe(res => {
            if (res.success) {
              const blob = new Blob([new Uint8Array(res.buffer.data)], { type: res.contentType });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = res.reporte;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
            } else {
              Swal.fire({
                icon:'warning',
                title:'¡No se realizó la descarga!',
                text: res.msg,
                confirmButtonText:'Entendido',
              })
            }
    })
  }
}
