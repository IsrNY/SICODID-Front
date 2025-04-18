import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environments } from '../../../environments/environments';
import { Token } from '../interfaces/token.interface';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Res } from '../interfaces/res.interface';
import { catchError, Observable, of, tap } from 'rxjs';
import { WebSocketService } from '../../shared/services/web-socket.service';
import { TablaActasComponent } from '../../distrital/components/tabla-actas/tabla-actas.component';

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
  }

  get id_transaccion() {
    return this.data?.id_transaccion;
  }

  get rol() {
    return this.data?.perfil;
  }

  get gt() {
    return this,this.data?.gt;
  }

  get turno() {
    return this.data?.turno;
  }

  get usuario():string | undefined {
    return this.data?.usuario;
  }

  get distrito():number | undefined {
    return this.data?.id_distrito;
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

  login = (user:User, clear:boolean | undefined = undefined) => {
    return this.http.post<Res>(`${this.baseUrl}/login`,user)
    .pipe(
      tap(res => {
        if(!res.success) {
          return;
        }
        console.log(res);

        if(clear) {
          localStorage.clear();
        }

        localStorage.setItem('token',res.token!);
        localStorage.setItem('inicio',res.inicioComputo!.toString());
        localStorage.setItem('cierre',res.cierreComputo!.toString());
        localStorage.setItem('iOp',res.inicioOperacion!.toString());
        localStorage.setItem('cOp',res.cierreComputo!.toString());
        this.decodeStorage();
        localStorage.setItem('turno',this.data?.turno.toString()!);
        localStorage.setItem('id_transaccion',this.id_transaccion?.toString()!);
        this.webSocketService.emit('configurar-usuario',{id_transaccion:this.id_transaccion});
      }),
      catchError(res => of(res.error as Res))
    )
  }

  logout = (reload:boolean = false):void =>  {
    this.clearStorage();
    this.router.navigateByUrl('auth');
    if(reload) {
      location.reload();
    }
  }

  clearStorage = ():void => {
    this.data = undefined;
    localStorage.clear();
    sessionStorage.clear();
    this.webSocketService.emit('logout');
    this.data == undefined;
  }
}
