import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Casillas } from '../../shared/interfaces/catalogos.interface';
import { Res } from '../../auth/interfaces/res.interface';
import { catchError, of, tap } from 'rxjs';
import { Actas, DatosActa } from '../interfaces/actas.interface';
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
    console.log(body)

    return this.http.post<Res>(`${this.baseUrl}/distrital/operacionInfo`,body,{headers})
    .pipe(
      catchError(res => of(res.error as Res))
    )
  }

  saveActas(acta:Actas, datos_acta:DatosActa, tipo_eleccion:number, option:number) {
    const id_seccion = datos_acta.id_seccion;
    const tipo_casilla = datos_acta.tipo_casilla;
    const tipo_operacion = datos_acta.operacion;
    const body = {...acta, id_seccion, tipo_casilla, tipo_eleccion};

    console.log(body)
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    console.log(tipo_operacion)

    if(option == 1) {
      return this.http.post<Res>(`${this.baseUrl}/distrital/operacion`,body,{headers})
      .pipe(
        catchError(res => of(res.error as Res))
      )
    } else {
      return this.http.put<Res>(`${this.baseUrl}/distrital/operacion`,body,{headers})
      .pipe(
        catchError(res => of(res.error as Res))
      )
    }
  }
}
