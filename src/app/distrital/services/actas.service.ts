import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Casillas } from '../../shared/interfaces/catalogos.interface';
import { Res } from '../../auth/interfaces/res.interface';
import { catchError, of, tap } from 'rxjs';
import { Actas } from '../interfaces/actas.interface';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Injectable({
  providedIn: 'root'
})
export class ActasService {
  private baseUrl = environments.baseUrl;
  private http = inject(HttpClient);

  get loadStorage():string {
    return localStorage.getItem('token')!;
  };

  getActas(acta:Casillas, tipo_eleccion:number) {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });
    const body = {...acta,tipo_eleccion}

    return this.http.post<Res>(`${this.baseUrl}/distrital/actainfo`,body,{headers})
    .pipe(
      catchError(res => of(res.error as Res))
    )
  }

  saveActas(acta:Actas, tipo_eleccion:number, id_seccion:number, tipo_casilla:string, tipo_operacion:number) {
    const body = {...acta, tipo_eleccion,id_seccion,tipo_casilla};

    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    if(tipo_operacion == 1) {
      return this.http.post<Res>(`${this.baseUrl}/distrital/acta`,body,{headers})
      .pipe(
        catchError(res => of(res.error as Res))
      )
    } else {
      return this.http.put<Res>(`${this.baseUrl}/distrital/acta`,body,{headers})
      .pipe(
        catchError(res => of(res.error as Res))
      )
    }

  }
}
