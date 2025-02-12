import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Res } from '../../auth/interfaces/res.interface';
import { catchError, of, tap } from 'rxjs';
import { Incidente } from '../interfaces/incidentes.interface';

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {
  private baseUrl = environments.baseUrl;
  private http = inject(HttpClient);

  get loadStorage() {
    return localStorage.getItem('token');
  }

  getIncidentes() {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    return this.http.get<Res>(`${this.baseUrl}/distrital/incidentes`,{headers})
    .pipe(
      catchError(res => of(res.error as Res))
    )
  }

  saveIncidente(incidente:Incidente, id_usuario:number) {
    console.log(incidente)
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });
    const body = {...incidente}
    return this.http.post<Res>(`${this.baseUrl}/distrital/incidentes`,body,{headers})
    .pipe(
      catchError(res => of(res.error as Res))
    )
  }

  updtIncidente(incidente:Incidente, id_incidente:number) {
    console.log(incidente)
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });
    const body = {...incidente,id_incidente};
    return this.http.put<Res>(`${this.baseUrl}/distrital/incidentes`,body,{headers})
    .pipe(
      catchError(res => of(res.error as Res))
    )
  }

  delIncidente(id_incidente:number) {
    console.log(id_incidente)
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    return this.http.delete<Res>(`${this.baseUrl}/distrital/incidentes?id_incidente=${id_incidente}`,{headers})
    .pipe(
      tap(res => console.log(res)),
      catchError(res => of(res.error as Res))
    )
  }
}
