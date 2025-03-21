import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IncidentesService } from '../../services/incidentes.service';
import { Incidente } from '../../interfaces/incidentes.interface';
import { DtAttibService } from '../../../shared/services/dt-attib.service';
import { Config } from 'datatables.net';
import { VerifyService } from '../../../auth/services/verify.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';

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

  ngOnInit(): void {
    this.dtOptions = this.dtAttrib.dtOptions;
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

  getListaIncidentes() {
    this.verifyService.verifyToken()
    .subscribe(res => {
      if(!res) {
        this.showModal = true;
        Swal.fire({
          icon:'info',
          title:'¡Atención!',
          text:'Su sesión ha expirado, es necesario proporcionar nuevamente sus credenciales para continuar, de lo contrario la sesión será terminada y se redirigirá a la página de inicio.',
          showCancelButton:true,
          confirmButtonText:'Acceder',
          cancelButtonText:'Cancelar'
        }).then((result) => {
          if(result.isConfirmed) {
            $('#confirmLoginModal').modal('show');
          } else {
            this.authService.logout();
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

  getReset(opcion:number) {
    if(opcion == 0) {
      if(!this.showModal) {
        this.incidentes = undefined;
      }
      this.getListaIncidentes();
    }
  }

  openModal(id_incidente:number, id_opcion:number) {
    this.verifyService.verifyToken()
    .subscribe(res => {
      if(!res) {
        this.showModal = true;
        Swal.fire({
          icon:'info',
          title:'¡Atención!',
          text:'Su sesión ha expirado, es necesario proporcionar nuevamente sus credenciales para continuar, de lo contrario la sesión será terminada y se redirigirá a la página de inicio.',
          showCancelButton:true,
          confirmButtonText:'Acceder',
          cancelButtonText:'Cancelar'
        }).then((result) => {
          if(result.isConfirmed) {
            // this.authService.clearStorage();
            $('#confirmLoginModal').modal('show');
          } else {
            this.authService.logout();
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
        $('#incidentes').modal('show');
        this.opcion = id_opcion;
      }
    })
  }

  getSuccess(success:boolean) {
    if(success) {
      this.showModal = false;
      this.getListaIncidentes();
    }
  }
}
