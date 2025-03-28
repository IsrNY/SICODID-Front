import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { IncidentesService } from '../../services/incidentes.service';
import { Incidente } from '../../interfaces/incidentes.interface';
import { DtAttibService } from '../../../shared/services/dt-attib.service';
import { Config } from 'datatables.net';
import { VerifyService } from '../../../auth/services/verify.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { Location } from '@angular/common';

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
  private location = inject(Location)

  ngOnInit(): void {
    this.dtOptions = this.dtAttrib.dtOptions;
    this.recharge = true;
  }

  ngOnChanges(): void {
    this.getListaIncidentes();
  }

  public incidentes:Incidente[] | undefined;
  public incidente!:Incidente;
  public show_modal:boolean = false;
  public opcion:number = 0;
  public dtOptions:Config = {};
  public showModal:boolean = false;
  public recharge?:boolean;
  public randomValue:number = 0;

  async getListaIncidentes() {
    if(this.recharge) {
      this.verifyService.verifyToken()
      .subscribe(res => {
        if(!res) {
          Swal.fire({
            icon:'warning',
            title:'¡Atención!',
            text:'El tiempo disponible para su sesión se ha agotado, se requieren sus credenciales de acceso para continuar, ¿Desea acceder?',
            showCancelButton:true,
            confirmButtonText:'Acceder',
            cancelButtonText:'Cancelar'
          }).then((result) => {
          console.log(result);
            if(result.isConfirmed) {
              $('#confirmLoginModal').modal('show');
              return;
            } else if(!result.isDismissed) {
              // $('#confirmLoginModal').modal('hide');
              this.recharge = false;
              this.authService.logout();
              // this.authService.clearStorage();
            }
          })
          return;
        } else {
          this.incidenttesService.getIncidentes()
          .subscribe(res => {
            this.incidentes = res.datos as Incidente[];
          })
        }
      })
    }
  }

  getReset(opcion:number) {
    if(opcion == 0) {
      if(!this.showModal) {
        this.incidentes = undefined;
      }
      this.getListaIncidentes();
    }
  }

  getRandom() {
    return Math.random() * 100;
  }

  openModal(id_incidente:number, id_opcion:number) {
    $('#confirmLoginModal').modal('show');
    this.randomValue = this.getRandom();

    // this.verifyService.verifyToken()
    // .subscribe(res => {
    //   if(!res) {
    //     this.showModal = true;
    //     Swal.fire({
    //       icon:'info',
    //       title:'¡Atención!',
    //       text:'Su sesión ha expirado, es necesario proporcionar nuevamente sus credenciales para continuar, de lo contrario la sesión será terminada y se redirigirá a la página de inicio.',
    //       showCancelButton:true,
    //       confirmButtonText:'Acceder',
    //       cancelButtonText:'Cancelar'
    //     }).then((result) => {
    //       if(result.isConfirmed) {
    //         // this.authService.clearStorage();
    //         $('#confirmLoginModal').modal('show');
    //       } else {
    //         this.authService.logout();
    //       }
    //     })
    //     return;
    //   } else {
    //     if(id_incidente !== 0) {
    //       this.incidentes!.filter(incidente => {
    //         if(id_incidente == incidente.id_incidente) {
    //           this.incidente = incidente
    //         }
    //       })
    //     }
    //     $('#incidentes').modal('show');
    //     this.opcion = id_opcion;
    //   }
    // })
  }

  getSuccess(success:boolean) {
    if(success) {
      this.showModal = false;
      this.recharge = true;
      this.getListaIncidentes();
    } else {
      this.recharge = false;
    }
  }
}
