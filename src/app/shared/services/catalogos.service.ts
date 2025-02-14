import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Res } from '../../auth/interfaces/res.interface';
import { catchError, of, tap } from 'rxjs';
import { Casillas } from '../interfaces/catalogos.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  private baseUrl = environments.baseUrl;
  private http = inject(HttpClient);

  private get loadStorage() {
    return localStorage.getItem('token');
  }

  getCatalogo(path:string) {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    return this.http.get<Res>(`${this.baseUrl}/cat/${path}`,{headers})
    .pipe(
      catchError(res => {
        if (res.status == 404)
          return of({datos:[]});
        else
          return of(res as Res);
      }))
  }
}
