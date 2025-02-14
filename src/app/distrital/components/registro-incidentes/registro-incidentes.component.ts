import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Incidente } from '../../interfaces/incidentes.interface';
import { Catalogos } from '../../../shared/interfaces/catalogos.interface';
import Swal from 'sweetalert2';
import { IncidentesService } from '../../services/incidentes.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { CatalogosService } from '../../../shared/services/catalogos.service';

declare var $:any;

@Component({
  selector: 'distrital-registro-incidentes',
  templateUrl: './registro-incidentes.component.html',
  styleUrl: './registro-incidentes.component.css'
})
export class RegistroIncidentesComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  private incidentesService = inject(IncidentesService);
  private validatorsService = inject(ValidatorsService);
  private catalogosService = inject(CatalogosService);

  public myForm = this.fb.group({
    id_tipo_incidente:['',[Validators.required]],
    fecha_hora_incidente:['',[Validators.required]],
    participantes:['',[Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    hechos:['',[Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    accion_tomada:['',[Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  })

  public id_incidentes:Catalogos[] = [];

  public edit:boolean = false;
  public maxlength:number = 1000;

  @Input()
  public incidente?:Incidente;

  @Input()
  public opcion:number = 0;

  @Output()
  public reset_opcion = new EventEmitter<number>();

  ngOnInit(): void {
    this.resetValues();
    this.getCatalogos();
  }

  resetValues() {
    this.myForm.markAsUntouched();
    this.myForm.patchValue({
      id_tipo_incidente:'',
      fecha_hora_incidente:'',
      participantes:'',
      hechos:'',
      accion_tomada:'',
    });
    this.edit = false;
    if(this.opcion > 1) {
      this.myForm.enable();
    }
    this.reset_opcion.emit(0);
  }

  ngOnChanges(): void {
    if(this.opcion == 0 || this.opcion == 1) {
      this.resetValues();
    } else {
      this.myForm.patchValue(this.incidente as Incidente);
      this.myForm.disable();
    }
  }

  closeModal() {
    $('#incidentes').modal('hide');
    this.resetValues();
  }

  getErrors(field:string) {
    console.log(this.getFieldLengthErrors(field))
  }

  changeEdit() {
    this.edit = !this.edit;
    if(this.edit) {
      this.myForm.enable();
    } else {
      this.myForm.disable();
    }
  }

  resetDate(){
    this.myForm.patchValue({fecha_hora_incidente:''})
  }

  touched(field:string) {
    if(this.getFieldLengthErrors(field) == 'Campo obligatorio' || this.getFieldLengthErrors(field).match('Cantidad mínima de caracteres:') || this.myForm.get(field)?.value.length > (field === 'participantes' ? (this.maxlength/4) : (this.maxlength))) {
      return true;
    } else {
      return false;
    }
  }

  getCatalogos() {
    this.catalogosService.getCatalogo('incidentes')
    .subscribe(res => {
      this.id_incidentes = res.datos as Catalogos[];
      console.log(this.id_incidentes)
    })
  }

  sendIncidente() {
    console.log(this.myForm.value);
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'Para realizar el registro o actualización de un incidente se deben cumplir todas las validaciones en el formulario.',
        confirmButtonText:'Entendido'
      })
      return;
    }

    Swal.fire({
      icon:'question',
      title:`¿Confirmar operación?`,
      text:`Está a punto de ${this.opcion < 2 ? 'guardar' : 'actualizar'} el registro del incidente, ¿Desea confirmar?`,
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Confirmar'
    }).then((result) => {
      if(result.isConfirmed) {
        if(this.opcion < 2) {
          this.incidentesService.saveIncidente(this.myForm.value as Incidente, 1)
          .subscribe(res => {
            Swal.fire({
              icon:res.success ? 'success' : 'error',
              title:res.success ? '¡Correcto!' : '¡Error!',
              text:res.msg,
              showConfirmButton:false,
              timer:2500
            }).then(() => {
              if(res.success) {
                $('#incidentes').modal('hide');
                this.resetValues();
              }
            })
          })
        } else {
          this.incidentesService.updtIncidente(this.myForm.value as Incidente,this.incidente?.id_incidente!)
          .subscribe(res => {
            Swal.fire({
              icon:res.success ? 'success' : 'error',
              title:res.success ? '¡Correcto!' : '¡Error!',
              text:res.msg,
              showConfirmButton:false,
              timer:2500
            }).then(() => {
              $('#incidentes').modal('hide');
              this.resetValues();
            })
          })
        }
      }
    })
  }

  delIncidente(id_incidente:number) {
    Swal.fire({
      icon:'info',
      title:'¡Atención!',
      text:'La eliminación de un incidente es un proceso irreversible, ¿Desea confirmar la eliminación?',
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Confirmar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.incidentesService.delIncidente(id_incidente)
        .subscribe(res => {
          Swal.fire({
            icon:res.success ? 'success' : 'error',
            title:res.success ? '¡Correcto!' : '¡Error!',
            text:res.msg,
            showConfirmButton:false,
            timer:2500
          }).then(() => {
            if(res.success) {
              $('#incidentes').modal('hide');
              this.resetValues();
            }
          })
        })
      }
    })
  }

  isValidField(field:string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldErrors(field:string) {
    return this.validatorsService.getFieldErrors(this.myForm, field);
  }

  getFieldLengthErrors(field:string, maxlength:number = 0) {
    return this.validatorsService.getFieldLengthErrors(this.myForm, field, maxlength);
  }
}
