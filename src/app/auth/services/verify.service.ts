import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { AuthService } from './auth.service';
import { WebSocketService } from '../../shared/services/web-socket.service';
import { Res } from '../interfaces/res.interface';
import { tap, map, of, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';


@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  private http = inject(HttpClient);
  private baseUrl = environments.baseUrl;
  private authService = inject(AuthService);
  private webSocketService = inject(WebSocketService);

  private get loadStorage() {
    return localStorage.getItem('token');
  }

  public inicio_computo:boolean = false;
  public cierre_computo:boolean = false;

  checkAuthentication = () => {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    return this.http.get<Res>(`${this.baseUrl}/verify`,{headers})
    .pipe(
      tap(res => {
        if(!res.success) {
          if(!res.msg?.match('Token verificado')) {
            Swal.fire({
              icon:'error',
              title:'¡Error!',
              text:res.msg,
              confirmButtonText:'Entendido'
            });
          }
          this.authService.logout();
          return;
        }
        // sessionStorage.setItem('inicio',res.inicioComputo.toString());
        // sessionStorage.setItem('cierre',res.cierreComputo.toString());
        this.inicio_computo = res.inicioComputo;
        this.cierre_computo = res.cierreComputo;
        if(res.token) {
          localStorage.setItem('token',res.token);
          localStorage.setItem('inicio',res.inicioComputo.toString())!;
          localStorage.setItem('cierre',res.cierreComputo.toString())!;
          this.authService.decodeStorage();
          localStorage.setItem('id_transaccion', this.authService.id_transaccion!.toString());
        }
        this.webSocketService.emit('configurar-usuario', {id_transaccion: this.authService.id_transaccion});
      }),
      map(res => res.success),
      catchError(() => of(false as boolean))
    )
  }

  verifyToken() {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.loadStorage}`
    });

    return this.http.get<Res>(`${this.baseUrl}/verify`,{headers})
    .pipe(
      map(res => res.success),
      catchError(() => of(false as boolean))
    )
  }
}
