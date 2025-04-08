import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Res } from '../../auth/interfaces/res.interface';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  private baseUrl = environments.baseUrl;
  private http = inject(HttpClient);

  private get loadStorage() {
    return localStorage.getItem('token');
  }

  getCatalogo(path:string, id_seccion:string | undefined = undefined, tipo_casilla:string | undefined = undefined) {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    if(id_seccion && tipo_casilla) {
      return this.http.get<Res>(`${this.baseUrl}/cat/${path}?id_seccion=${id_seccion}&tipo_casilla=${tipo_casilla}`,{headers})
      .pipe(
        catchError(res => of(res.error as Res))
      )
    } else {
      return this.http.get<Res>(`${this.baseUrl}/cat/${path}`,{headers})
      .pipe(
        catchError(res => of(res.error as Res))
      )
    }

  }

  getContador(path:string) {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    return this.http.get<Res>(`${this.baseUrl}/distrital/${path}`,{headers})
    .pipe(
      catchError(res => of(res.error as Res))
    )
  }
}
