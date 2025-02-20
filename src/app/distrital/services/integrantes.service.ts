import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Res } from '../../auth/interfaces/res.interface';
import { catchError, of } from 'rxjs';
import { Integrantes } from '../interfaces/integrantes.interface';

@Injectable({
  providedIn: 'root'
})
export class IntegrantesService {
  private baseUrl = environments.baseUrl;
  private http = inject(HttpClient);

  get loadStorage():string {
    return localStorage.getItem('token')!;
  }
  getIntegrantes() {
    const headers = {
      'Authorization' : `Bearer ${this.loadStorage}`
    };

    return this.http.get<Res>(`${this.baseUrl}/distrital/all_integrantes`, { headers })
    .pipe(
      catchError(res => of(res.error as Res))
    );
  }

  getIntegrante(id_integrante: number) {
    const headers = {
      'Authorization' : `Bearer ${this.loadStorage}`
    };

    return this.http.get<Res>(`${this.baseUrl}/distrital/integrantes?id_integrante=${id_integrante}`, { headers })
   .pipe(
     catchError(res => of(res.error as Res))
   )
  }

  saveIntegrante(integrante:Integrantes) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loadStorage}`
    });

    return this.http.post<Res>(`${this.baseUrl}/distrital/integrantes`, integrante, { headers })
   .pipe(
    catchError(res => of(res.error as Res))
   )
  }

  updateIntegrante(integrante: Integrantes) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loadStorage}`
    });

    return this.http.put<Res>(`${this.baseUrl}/distrital/integrantes`, integrante, { headers })
   .pipe(
    catchError(res => of(res.error as Res))
   )
  }

  deleteIntegrante(id_integrante: number) {
    console.log(id_integrante)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loadStorage}`
    })

    return this.http.delete<Res>(`${this.baseUrl}/distrital/integrantes?id_integrante=${id_integrante}`, { headers })
    .pipe(
      catchError(res => of(res.error as Res))
    );
  }
}
