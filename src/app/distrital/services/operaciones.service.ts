import { inject, Injectable, PipeTransform } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Res } from '../../auth/interfaces/res.interface';
import { catchError, of } from 'rxjs';
import { Operaciones } from '../interfaces/operiaciones.interface';

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {
  private baseUrl = environments.baseUrl;
  private http = inject(HttpClient);

  get loadStorage():string {
    return localStorage.getItem('token')!;
  }

  getListaOperaciones() {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    return this.http.get<Res>(`${this.baseUrl}/distrital/icOperacion`,{headers})
    .pipe(
      catchError(res => of(res.error as Res))
    );
  }

  saveDatosOperacion(operacion:Operaciones, opcion:number) {
    const fecha_hora_inicio = operacion.fecha_hora_inicio.replace('T',' ');
    const fecha_hora_fin = operacion.fecha_hora_fin.replace('T', ' ');
    operacion.fecha_hora_inicio = fecha_hora_inicio;
    operacion.fecha_hora_fin = fecha_hora_fin;
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    if(opcion == 1) {
      return this.http.post<Res>(`${this,this.baseUrl}/distrital/icOperacion`, operacion,{headers})
      .pipe(
        catchError(res => of(res.error as Res))
      );
    } else {
      return this.http.put<Res>(`${this.baseUrl}/distrital/icOperacion`, operacion,{headers})
      .pipe(
        catchError(res => of(res.error as Res))
      );
    }
  }

  deleteRegistroOperaciones(id_actividad:number) {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    return this.http.delete<Res>(`${this.baseUrl}/distrital/icOperacion`,{body: {id_actividad}, headers})
    .pipe(
      catchError(res => of(res.error as Res))
    )
  }
}
