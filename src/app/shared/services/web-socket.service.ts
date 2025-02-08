import { inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket = inject(Socket);

  public socketStatus:boolean = false;
  constructor() {
    this.checkStatus();
  }

  checkStatus = () => {
    this.socket.on('connect', () => {
      console.log('Se ha conectado con el servidor correctamente.');
      if(localStorage.getItem('id_transaccion')) {
        this.socket.emit('configurar-usuario', { id_transaccion: Number.parseInt(localStorage.getItem('id_transaccion')!) });
      }
      this.socketStatus = true;
    })

    this.socket.on('disconnect', () => {
      console.log('Se ha perdido la conexión con el servidor.');
      this.socketStatus = false;
    })
  }

  emit = (evento:string, payLoad?:any, callback?:Function) => this.socket.emit(evento,payLoad,callback);
}
