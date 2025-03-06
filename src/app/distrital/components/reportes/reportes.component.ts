import { Component, inject } from '@angular/core';
import { DocumentsService } from '../../../shared/services/documents.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'distrital-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  private documentsService = inject(DocumentsService);

  public reportes = [
    {
      nombre: 'Reporte de Juzgados',
      path:'juzgados'
    },
    {
      nombre: 'Reporte de Magistraturas',
      path:'magistraturas'
    },
    {
      nombre: 'Reporte de Incidentes',
      path:'incidentes'
    },
    {
      nombre: 'Reporte de Inicio de Cómputo',
      path:'inicio_computo'
    },
    {
      nombre: 'Reporte de Cierre de Cómputo',
      path:'cierre_computo'
    },
  ];

  downloadDocument(path:string) {
    this.documentsService.downloadReporte(path)
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
