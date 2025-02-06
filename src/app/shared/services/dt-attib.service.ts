import { Injectable } from '@angular/core';
import { Config } from 'datatables.net';

@Injectable({
  providedIn: 'root'
})
export class DtAttibService {

  public dtOptions:Config = {
    processing:true,
    retrieve:true,
    paging:true,
    layout: {
      bottomEnd: {
          paging: {
            firstLast:false
          },
      }
    },
    ordering: false,
    lengthMenu: [25, 35, 50, 75, 100],
    language: {
      decimal: "",
      emptyTable: "No hay registros para mostrar.",
      info: "<b>Mostrando _START_ a _END_ de _TOTAL_ de registros totales</b>",
      infoEmpty: "<b>Mostrando 0 a 0 de 0 registros</b>",
      infoFiltered: "(Filtrado de _MAX_ total de entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "<b>Mostrando _MENU_ registros</b>",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "<b>Realizar búsqueda:</b>",
      searchPlaceholder:"Término de búsqueda",
      zeroRecords: "No se encontró información con el término de busqueda especificado."
    }
  }
}
