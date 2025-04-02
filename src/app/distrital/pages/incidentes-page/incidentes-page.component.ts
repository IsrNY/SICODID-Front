import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { IncidentesService } from '../../services/incidentes.service';
import { Incidente } from '../../interfaces/incidentes.interface';
import { DtAttibService } from '../../../shared/services/dt-attib.service';
import { Config } from 'datatables.net';
import { VerifyService } from '../../../auth/services/verify.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { Location } from '@angular/common';
import { SharedMethodsService } from '../../../shared/services/shared-methods.service';

declare var $:any;

@Component({
  selector: 'distrital-incidentes-page',
  templateUrl: './incidentes-page.component.html',
  styleUrl: './incidentes-page.component.css'
})
export class IncidentesPageComponent implements OnInit, OnChanges {
  private incidenttesService = inject(IncidentesService);
  private dtAttrib = inject(DtAttibService);
  private verifyService = inject(VerifyService);
  private authService = inject(AuthService);
  private sharedMethodsService = inject(SharedMethodsService);

  ngOnInit(): void {
    this.dtOptions = this.dtAttrib.dtOptions;
    // this.recharge = true;
    this.getListaIncidentes();
  }

  ngOnChanges(): void {
    if(this.reset_value !== 0) {
      this.sharedMethodsService.data$
      .subscribe(success => {
        if(success) {
          console.log(success);
          this.getListaIncidentes();
        }
      })
    }
  }

  public incidentes:Incidente[] | undefined;
  public incidente!:Incidente;
  public opcion:number = 0;
  public dtOptions:Config = {};
  public showModal:boolean = false;
  public reset_value:number = 0;

  getListaIncidentes() {
    this.incidenttesService.getIncidentes()
    .subscribe(res => {
      this.incidentes = res.datos as Incidente[];
      console.log(this.incidentes);
    })
  }

  getReset(opcion:number) {
    this.reset_value = opcion;
    if(this.reset_value !== 0) {
      // this.verifyService.verifyToken()
      // .subscribe(res => {
      //   if(!res) {
      //     this.showModal = true;
      //     Swal.fire({
      //       icon:'warning',
      //       title:'¡Atención!',
      //       text:'El tiempo de su sesión ha terminado, para continuar con sus actividades, es necesario proporcionar nuevamente sus credenciales de acceso.',
      //       showCancelButton:true,
      //       confirmButtonText:'Acceder',
      //       cancelButtonText:'Cancelar'
      //     }).then((result) => {
      //       if(result.isConfirmed) {
      //         $('#confirmLoginModal').modal('show');
      //       } else {
      //         this.authService.logout(true);
      //       }
      //     })
      //     return;
      //   }
      // })
      this.incidentes = undefined;
      this.getListaIncidentes();
    }
  }

  openModal(id_incidente:number, id_opcion:number) {
    this.verifyService.verifyToken()
    .subscribe(res => {
      if(!res) {
        this.showModal = true;
        Swal.fire({
          icon:'warning',
          title:'¡Atención!',
          text:'El tiempo de su sesión ha terminado, para continuar con sus actividades, es necesario proporcionar nuevamente sus credenciales de acceso.',
          showCancelButton:true,
          confirmButtonText:'Acceder',
          cancelButtonText:'Cancelar'
        }).then((result) => {
          if(result.isConfirmed) {
            $('#confirmLoginModal').modal('show');
          } else {
            this.authService.logout(true);
          }
        })
        return;
      } else {
        if(id_incidente !== 0) {
          this.incidentes!.filter(incidente => {
            if(id_incidente == incidente.id_incidente) {
              this.incidente = incidente
            }
          })
        }
        this.opcion = id_opcion;
        this.reset_value = 0;
        $('#incidentes').modal('show');
      }
    })
  }
}
