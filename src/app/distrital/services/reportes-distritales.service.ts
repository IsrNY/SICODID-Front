import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Casillas } from '../../shared/interfaces/catalogos.interface';
import { catchError, of } from 'rxjs';
import { Reporte } from '../../shared/interfaces/reportes.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportesDistritalesService {
  private baseUrl = environments.baseUrl;
  private http = inject(HttpClient);

  get loadStorare():string {
    return localStorage.getItem('token')!;
  }

  download(acta:Casillas,path:string, opcion:number) {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorare}`
    });

    if(opcion == 1) {
      return this.http.post<Reporte>(`${this.baseUrl}/distrital/reportes/${path}`,acta,{headers})
      .pipe(
        catchError(res => of(res.error as Reporte))
      );
    } else {
      return this.http.get<Reporte>(`/distrital/reportes/${path}`,{headers})
      .pipe(
        catchError(res => of(res.eror as Reporte))
      );
    }
  }
}
