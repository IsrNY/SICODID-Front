import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { catchError, of } from 'rxjs';
import { Res } from '../../auth/interfaces/res.interface';
import { Reporte } from '../interfaces/reportes.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private http = inject(HttpClient);
  private baseUrl = environments.baseUrl;

  get loadStorage():string {
    return localStorage.getItem('token')!;
  }

  downloadReporte(path:string) {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`,
    });

    return this.http.get<Reporte>(`${this.baseUrl}/distrital/reportes/${path}`, { headers})
    .pipe(
      catchError(res => of(res.error as Reporte)),
    );
  }
}
