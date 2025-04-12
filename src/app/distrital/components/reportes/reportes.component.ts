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
      nombre:'Reporte de resultados de la elección de Magistraturas del Tribunal de Disciplina Judicial',
      path:'tribunal'
    },
    {
      nombre: 'Reporte de resultados de la elección de Magistraturas del Poder Judicial',
      path:'magistraturas'
    },
    {
      nombre: 'Reporte de resultados de la elección de Juzgados del Poder Judicial',
      path:'juzgados'
    },
    {
      nombre: 'Reporte de Incidentes',
      path:'incidentes'
    },
    {
      nombre: 'Reporte distrital sobre el Inicio de los Cómputos Distritales',
      path:'inicio_computo'
    },
    {
      nombre: 'Reporte distrital sobre el Cierre de los Cómputos Distritales',
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
