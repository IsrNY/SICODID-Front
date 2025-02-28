import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActasService } from '../../services/actas.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { Actas, Datos } from '../../interfaces/actas.interface';

import { Casillas, Catalogos } from '../../../shared/interfaces/catalogos.interface';

import Swal from 'sweetalert2';
import { CatalogosService } from '../../../shared/services/catalogos.service';


declare var $:any;

@Component({
  selector: 'distrital-actas',
  templateUrl: './actas.component.html',
  styleUrl: './actas.component.css'
})
// export class ActasComponent implements OnChanges, OnInit {
export class ActasComponent {
  // private fb = inject(FormBuilder);
  // private actasService = inject(ActasService);
  // private validatorsService = inject(ValidatorsService);
  // private catalogosService = inject(CatalogosService);

  // public myForm = this.fb.group({
  //   tipo_eleccion:['',[Validators.required]],
  //   boletas_sobrantes: ['',[Validators.required]],
  //   cand_no_registrados: ['',[Validators.required]],
  //   votos_nulos: ['',[Validators.required]],
  //   total_emitida: ['',[Validators.required]],
  //   candidatos: this.fb.group({
  //     M: this.fb.array([]),
  //     H: this.fb.array([])
  //   }) })

  // @Input()
  // public tipo_eleccion:number = 0;

  // @Input()
  // public tipo_operacion:number = 0;

  // @Input()
  // public acta?:Casillas;


  // @Output()
  // public reload = new EventEmitter<boolean>();


  // public actas?:Actas | undefined;
  // public eleccion:Catalogos[] = [];

  // get candidatos():FormGroup {
  //   return this.myForm.get('candidatos') as FormGroup;
  // }

  // get candidatosM():FormArray {
  //   return this.myForm.get('candidatos')?.get('M') as FormArray;
  // }

  // get candidatosH():FormArray {
  //   return this.myForm.get('candidatos')?.get('H') as FormArray;
  // }

  // get elect() {
  //   return +this.myForm.get('tipo_eleccion')?.value!;
  // }

  // ngOnInit(): void {
  //   this.catalogosService.getCatalogo('tipo-eleccion')
  //   .subscribe(res => {
  //     this.eleccion = res.datos as Catalogos[];
  //   })
  // }

  // ngOnChanges(): void {
  //   switch(this.tipo_operacion) {
  //     default:
  //       this.myForm.patchValue({tipo_eleccion:this.tipo_eleccion.toString()})
  //       this.getActa();
  //     break;
  //   }
  // }

  // getActa() {
  //   return this.actasService.getActas(this.acta!,this.elect)
  //   .subscribe(res => {
  //     console.log(res.datos)
  //     this.actas = res.datos as Actas;
  //     this.myForm.patchValue({
  //       boletas_sobrantes: this.actas?.boletas_sobrantes == null ? '': this.actas!.boletas_sobrantes,
  //       cand_no_registrados: this.actas?.cand_no_registrados,
  //       votos_nulos: this.actas?.votos_nulos,
  //       total_emitida: this.actas?.total_emitida,
  //     });
  //     this.patchCandidatosM(this.actas?.candidatos.M as Datos[]);
  //     this.patchCandidatosH(this.actas?.candidatos!.H as Datos[]);
  //   })
  // }

  // patchCandidatosM = (candidatos:Datos[]) => candidatos.forEach(candidato => this.candidatosM.push(this.fb.group({
  //   id_candidato:[candidato.id_candidato],
  //   nombre:[candidato.nombre],
  //   postula:[candidato.postula],
  //   descripcion:[candidato.descripcion],
  //   votos:[candidato.votos, [Validators.required]],
  // })))

  // patchCandidatosH = (candidatos:Datos[]) => candidatos.forEach(candidato => this.candidatosH.push(this.fb.group({
  //   id_candidato:[candidato.id_candidato],
  //   nombre:[candidato.nombre],
  //   postula:[candidato.postula],
  //   descripcion:[candidato.descripcion],
  //   votos:[candidato.votos, [Validators.required]],
  // })))

  // resetValues() {
  //   this.myForm.patchValue({
  //     boletas_sobrantes:'',
  //     cand_no_registrados:'',
  //     votos_nulos:'',
  //     total_emitida:'',
  //   });
  //   this.candidatosM.clear();
  //   this.candidatosH.clear();
  //   this.actas  = undefined;
  //   this.myForm.markAsUntouched();
  // }

  // closeModal() {
  //   if(this.tipo_operacion == 1) {
  //     this.reload.emit(true);
  //   }
  //   this.resetValues();
  //   $('#actas').modal('hide');
  //   // this.resetValues();
  // }

  // bloquear(event:KeyboardEvent) {
  //   if(event.key === 'ArrowUp' || event.key === 'ArrowDown') {
  //     event.preventDefault()
  //   }
  // }

  // next(event:any, id:string) {
  //   let keyCode = event.keyCode;

  //   if(keyCode == 13) {
  //     $(`#${id}`).select();
  //   }
  // }

  // enter(event:any, id:string){
  //   let keyCode = event.keyCode;

  //   if(keyCode == 13) {
  //       $(`#${id}`).select();
  //   }
  // }

  // limit(event:any) {
  //   let charCode = event.charCode;

  //   if(charCode !== 8 || charCode !== 9) {
  //     let max = 3;

  //     if((charCode < 48 || charCode > 57 || event.target.value.length >= max)) return false;
  //   }
  //   return;
  // }

  // saveActa() {
  //   console.log(this.myForm.value
  //   )
  //   if(this.myForm.invalid) {
  //     this.myForm.markAllAsTouched();
  //     Swal.fire({
  //       icon:'warning',
  //       title:'¡Atención!',
  //       text:'Para realizar el registro o actualización de un acta se deben cumplir todas las validaciones en el formulario.',
  //       confirmButtonText:'Entendido'
  //     })
  //     return;
  //   }

  //   Swal.fire({
  //     icon:'question',
  //     title:`¿Confirmar ${this.tipo_operacion == 1 ? 'registro' : 'actualización'}?`,
  //     text:`Está a punto de realizar ${this.tipo_operacion == 1 ? 'la captura' : 'una actualización'} del acta, ¿Desea confirmar?`,
  //     showCancelButton:true,
  //     cancelButtonText:'Cancelar',
  //     confirmButtonText:'Confirmar'
  //   }).then((result) => {
  //     if(result.isConfirmed) {
  //       this.actasService.saveActas(this.myForm.value as Actas,this.tipo_eleccion,+this.acta?.id_seccion!,this.acta?.tipo_casilla!, this.tipo_operacion, this.acta?.status!)
  //       .subscribe(res => {
  //         Swal.fire({
  //           icon:res.success ? 'success' : 'error',
  //           title:res.success ? '¡Correcto!' : '¡Error!',
  //           text:res.msg,
  //           showConfirmButton:false,
  //           timer:2500
  //         })
  //         // .then(() => {
  //         //   if(res.success) {
  //         //     if(this.tipo_operacion == 1) {
  //         //       this.reload.emit(true);
  //         //     }
  //         //     // this.resetValues();
  //         //   }
  //         // })
  //       })
  //     }
  //   })
  // }

  // isValidField(field:string) {
  //   return this.validatorsService.isValidField(this.myForm,field);
  // }

  // getFieldErrors(field:string) {
  //   return this.validatorsService.getFieldErrors(this.myForm,field);
  // }

  // isValidFieldVotos(array:string , position:string, form_field:string) {
  //   return this.validatorsService.isValidVotosField(this.candidatos, array, position,form_field);
  // }

  // getFieldErrorsVotos(array:string, position:string, form_field:string) {
  //   return this.validatorsService.getFieldVotosErrors(this.candidatos, array, position,form_field);
  // }
}
