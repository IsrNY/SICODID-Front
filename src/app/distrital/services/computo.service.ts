import { Injectable, inject } from '@angular/core';
import { Computo } from '../interfaces/computo.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Res } from '../../auth/interfaces/res.interface';
import { environments } from '../../../environments/environments';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputoService {
  private http = inject(HttpClient);
  private baseUrl = environments.baseUrl;

  private get loadStorage() {
    return localStorage.getItem('token');
  }

  setComputo(computo:Computo, mode:string) {
    const path = mode == 'inicio' ? 'inicioComputo' : 'cierreComputo';
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });
    const body = computo

    return this.http.post<Res>(`${this.baseUrl}/${path}`,body,{headers})
    .pipe(
      catchError(res => of(res.error as Res))
    )
  }

  getComputo(mode:string) {
    const path = mode == 'inicio' ? 'inicioComputo' : 'cierreComputo';
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    return this.http.get<Res>(`${this.baseUrl}/${path}`,{headers})
    .pipe(
      catchError(res => of(res.error as Res))
    )
  }

  updtComputo(computo:Computo,mode:string) {
    const path = mode == 'inicio' ? 'inicioComputo' : 'cierreComputo';
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    const body = computo;

    return this.http.put<Res>(`${this.baseUrl}/${path}`,body, {headers})
    .pipe(
      catchError(res => of(res.error as Res)
      ))
  }
}
