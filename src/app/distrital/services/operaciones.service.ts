import { inject, Injectable } from '@angular/core';
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

  saveDatosOperacion(operacion:Operaciones) {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    return this.http.post<Res>(`${this,this.baseUrl}/distrital/icOperacion`, {operacion},{headers})
    .pipe(
      catchError(res => of(res.error as Res))
    );
  }
}
