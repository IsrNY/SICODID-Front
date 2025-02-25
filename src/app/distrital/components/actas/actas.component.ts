import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Casillas } from '../../../shared/interfaces/catalogos.interface';
import { ActasService } from '../../services/actas.service';
import { Actas, Candidato, Datos } from '../../interfaces/actas.interface';
import { ValidatorsService } from '../../../shared/services/validators.service';


declare var $:any;

@Component({
  selector: 'distrital-actas',
  templateUrl: './actas.component.html',
  styleUrl: './actas.component.css'
})
export class ActasComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private actasService = inject(ActasService);
  private validatorsService = inject(ValidatorsService);

  public myForm = this.fb.group({
    boletas_sobrantes: ['',[Validators.required]],
    cand_no_registrados: ['',[Validators.required]],
    votos_nulos: ['',[Validators.required]],
    total_emitida: ['',[Validators.required]],
    genero:['',[Validators.required]],
    candidatos: this.fb.array([]),
  })

  @Input()
  public tipo_eleccion:number = 0;

  @Input()
  public tipo_operacion:number = 0;

  @Input()
  public acta?:Casillas;

  @Input()
  public actas!:Actas | undefined;

  @Output()
  public reload = new EventEmitter<boolean>();

  public arrayH:Datos[] = [];
  public arrayM:Datos[] = [];
  public arrayData:Datos[] = [];

  get candidatos():FormArray {
    return this.myForm.get('candidatos') as FormArray;
  }

  ngOnChanges(): void {
    this.candidatos.clear();
    switch(this.tipo_operacion) {
      default:
        this.myForm.patchValue({
          boletas_sobrantes: this.actas!.boletas_sobrantes,
          cand_no_registrados: this.actas!.cand_no_registrados,
          votos_nulos: this.actas!.votos_nulos,
          total_emitida: this.actas!.total_emitida,
        });
        this.patchCandidatos(this.actas?.candidatos!.H as Datos[]);
    }
  }

  patchCandidatos = (candidatos:Datos[]) => candidatos.forEach(candidato => this.candidatos.push(this.fb.group({
    id_candidato:[candidato.id_candidato],
    nombre:[candidato.nombre],
    postula:[candidato.postula],
    descripcion:[candidato.descripcion],
    votos:[candidato.votos, [Validators.required]],
  })));

  resetValues() {
    this.myForm.patchValue({
      boletas_sobrantes:'',
      cand_no_registrados:'',
      votos_nulos:'',
      total_emitida:'',
      candidatos:([]),
    });
    this.candidatos.clear();
    // this.acta = undefined;
    this.actas  = undefined;
    this.myForm.markAsUntouched();
  }

  closeModal() {
    this.resetValues();
    $('#actas').modal('hide');
  }

  getTipoEleccion() {
    switch(this.tipo_eleccion) {
      case 1:
        return 'JUECES DE LOS JUZGADOS DEL PODER JUDICIAL.';
      case 2:
        return 'SALAS DEL TRIBUNAL SUPERIOR DE JUSTICIA.';
      case 3:
        return 'MAGISTRADAS Y MAGISTRADOS DEL TRIBUNAL DE DISCIPLINA JUDICIAL.'
    }
    return;
  }

  bloquear(event:KeyboardEvent) {
    if(event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
    }
  }

  next(event:any, id:string) {
    let keyCode = event.keyCode;

    if(keyCode == 13) {
      $(`#${id}`).focus();
    }
  }

  enter(event:any, id:number){
    let keyCode = event.keyCode;

    if(keyCode == 13) {
      $(`#${id}`).focus();
    }
  }

  limit(event:any) {
    let charCode = event.charCode;

    if(charCode !== 8 || charCode !== 9) {
      let max = 3;

      if((charCode < 48 || charCode > 57 || event.target.value.length >= max)) return false;
    }
    return;
  }

  saveActa() {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'Para realizar el registro o actualización de un acta se deben cumplir todas las validaciones en el formulario.',
        confirmButtonText:'Entendido'
      })
      return;
    }

    // Swal.fire({
    //   icon:'question',
    //   title:`¿Confirmar ${this.tipo_operacion == 1 ? 'registro' : 'actualización'}?`,
    //   text:`Está a punto de realizar ${this.tipo_operacion == 1 ? 'la captura' : 'una actualización'} del acta, ¿Desea confirmar?`,
    //   showCancelButton:true,
    //   cancelButtonText:'Cancelar',
    //   confirmButtonText:'Confirmar'
    // }).then((result) => {
    //   if(result.isConfirmed) {
    //     this.actasService.saveActas(this.myForm.value as Actas,this.tipo_eleccion,+this.acta?.id_seccion!,this.acta?.tipo_casilla!, this.tipo_operacion)
    //     .subscribe(res => {
    //       Swal.fire({
    //         icon:res.success ? 'success' : 'error',
    //         title:res.success ? '¡Correcto!' : '¡Error!',
    //         text:res.msg,
    //         showConfirmButton:false,
    //         timer:2500
    //       }).then(() => {
    //         if(res.success) {
    //           if(this.tipo_operacion == 1) {
    //             this.reload.emit(true);
    //           }
    //           this.resetValues();
    //           $('#actas').modal('hide');
    //         }
    //       })
    //     })
    //   }
    // })
  }

  isValidField(field:string) {
    return this.validatorsService.isValidField(this.myForm,field);
  }

  getFieldErrors(field:string) {
    return this.validatorsService.getFieldErrors(this.myForm,field);
  }

  isValidFieldVotos(field:string, position:string, form_field:string) {
    return this.validatorsService.isValidFieldVotos(this.myForm,field, position,form_field);
  }

  getFieldErrorsVotos(field:string, position:string, form_field:string) {
    return this.validatorsService.getFieldErrorsVotos(this.myForm, field,position,form_field);
  }
}
