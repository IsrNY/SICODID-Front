import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environments } from '../../../environments/environments';
import { Token } from '../interfaces/token.interface';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Res } from '../interfaces/res.interface';
import { catchError, of, tap } from 'rxjs';
import { WebSocketService } from '../../shared/services/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private webSocketService = inject(WebSocketService);
  private http = inject(HttpClient);
  private baseUrl = environments.baseUrl;
  private data:Token | undefined;

  constructor() {
    this.decodeStorage();
    console.log(this.decodeStorage())
  }

  get id_transaccion() {
    return this.data?.id_transaccion;
  }

  get rol() {
    return this.data?.perfil;
  }

  get usuario() {
    return this.data?.usuario;
  }

  private loadStorage() {
    return localStorage.getItem('token');
  }

  public decodeStorage() {
    if(!this.loadStorage()) {
      this.data = undefined;
      return;
    }
    this.data = jwtDecode<Token>(localStorage.getItem('token')!);
  }

  login(user:User) {
    return this.http.post<Res>(`${this.baseUrl}/login`,user)
    .pipe(
      tap(res => {
        if(!res.success) {
          return;
        }

        localStorage.setItem('token',res.token!);
        // sessionStorage.setItem('inicio',res.inicioComputo!.toString());
        // sessionStorage.setItem('cierre',res.cierreComputo!.toString());
        this.decodeStorage();
        localStorage.setItem('id_transaccion',this.id_transaccion?.toString()!);
        this.webSocketService.emit('configurar-usuario',{id_transaccion:this.id_transaccion});
      }),
      catchError(res => of(res.error as Res))
    )
  }

  logout(reload:boolean = false) {
    this.clearStorage();
    this.router.navigateByUrl('auth');
    if(reload) {
      location.reload();
    }
  }

  clearStorage() {
    this.data = undefined;
    localStorage.clear();
    sessionStorage.clear();
    this.webSocketService.emit('logout');
    this.data == undefined;
  }
}
