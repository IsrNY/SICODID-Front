import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActasService } from '../../services/actas.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { CatalogosService } from '../../../shared/services/catalogos.service';

import { Actas, Datos, DatosActa } from '../../interfaces/actas.interface';
import { Catalogos } from '../../../shared/interfaces/catalogos.interface';

import Swal from 'sweetalert2';


declare var $:any;

@Component({
  selector: 'distrital-actas',
  templateUrl: './actas.component.html',
  styleUrl: './actas.component.css'
})
export class ActasComponent implements OnInit, OnChanges{
  private fb = inject(FormBuilder);
  private actasService = inject(ActasService);
  private validatorsService = inject(ValidatorsService);
  private catalogosService = inject(CatalogosService);

  public myForm = this.fb.group({
    tipo_eleccion:['',[Validators.required]],
    total_votos:['', [Validators.required]],
    votos_nulos: ['',[Validators.required]],
    recuadros_nu: [''],
    candidatos: this.fb.array([])
  });

  public tipos_eleccion:Catalogos[] = [];
  public tipo_eleccion:Catalogos[] = [];
  public acta:Actas | undefined;
  public opcion:number = 0;

  @Input()
  public datos_acta:DatosActa | undefined;

  @Output()
  public reload = new EventEmitter<boolean>();

  get eleccion():string {
    return this.myForm.get('tipo_eleccion')?.value!;
  }

  get candidatos():FormArray {
    return this.myForm.get('candidatos') as FormArray;
  }


  ngOnInit(): void {
    this.getTiposEleccion();
  }

  ngOnChanges(): void {
    this.opcion = this.datos_acta?.operacion!;
    switch(+this.eleccion) {
      default:
        this.myForm.patchValue({tipo_eleccion:this.datos_acta?.tipo_eleccion!.toString()});
        this.getDatosActa();
        this.getTiposEleccionSA(this.datos_acta?.id_seccion.toString()!, this.datos_acta?.tipo_casilla!);
      break;
    }
  }

  getTiposEleccion() {
    this.catalogosService.getCatalogo('tipo-eleccion')
   .subscribe(res => {
    this.tipos_eleccion = res.datos as Catalogos[];
   });
  }

  getTiposEleccionSA(id_seccion:string, tipo_casilla:string) {
    this.tipo_eleccion = [];
    this.catalogosService.getCatalogo('tipo-eleccion', id_seccion, tipo_casilla)
   .subscribe(res => {
    this.tipos_eleccion = res.datos as Catalogos[];
    if(this.datos_acta?.operacion == 2) {
      this.tipos_eleccion.forEach(t_elec => {
        if(t_elec.tiene_votos == 1) {
          this.tipo_eleccion.push(t_elec);
        }
      })
    } else {
      this.tipo_eleccion = this.tipos_eleccion;
    }
   })
  }

  getDatosActa() {
    this.acta = undefined;
    this.candidatos.clear();
    this.myForm.markAsUntouched();
    this.actasService.getActas(this.datos_acta!, +this.eleccion)
    .subscribe(res => {
      this.acta = res.datos as Actas;
      console.log(this.acta.candidatos)
      this.myForm.patchValue(this.acta);
      this.patchCandidatos(this.acta.candidatos);
      console.log('valor del form', this.myForm.value);
    })
  }

  patchCandidatos = (candidatos:Datos[]) => candidatos.forEach(candidato => this.candidatos.push(this.fb.group({
    id_candidato:[candidato.id_candidato],
    nombre:[candidato.nombre],
    postula:[candidato.postula],
    tipo_materia:[candidato.tipo_materia],
    votos:[candidato.votos],
    genero:[candidato.genero]
  })))

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

  saveActa() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: '¡Atención!',
        text: 'Todos los campos del furmulario deben contener la información requerida y sus validaciones completas.',
        confirmButtonText: 'Corregir formulario'
      });
      return;
    }
    Swal.fire({
      icon:'question',
      title:`¿Confirmar ${this.datos_acta?.operacion == 1 ? 'captura' : 'actualización'}?`,
      text:`Está a punto de realizar ${this.datos_acta?.operacion == 1 ? 'la captura' : 'una actualización'} del acta, ¿Desea confirmar?`,
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Confirmar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.actasService.saveActas(this.myForm.value as Actas, this.datos_acta as DatosActa, +this.eleccion)
        .subscribe(res => {
          Swal.fire({
            icon:res.success ? 'success' : (res.msg == 'Esta acta de este tipo de elección ya fue capturada' ? 'warning' : 'error'),
            title: res.success ? '¡Correcto!' : (res.msg == 'Esta acta de este tipo de elección ya fue capturada' ? '¡Atención!' : '¡Error!'),
            text: res.msg,
            showConfirmButton: false,
            timer:2350
          }).then(() => {
            if(res.success) {
              this.myForm.markAsUntouched();
            }
          })
        })
      }
    })
  }

  closeModal() {
    $('#actas').modal('hide');
    this.reload.emit(true);
    this.myForm.markAsUntouched();
  }

   bloquear(event:KeyboardEvent) {
    if(event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
    }
  }

  next(event:any, id:string) {
    let keyCode = event.keyCode;

    if(keyCode == 13) {
      $(`#${id}`).select();
    }
  }

  enter(event:any, id:string){
    let keyCode = event.keyCode;

    if(keyCode == 13) {
        $(`#${id}`).select();
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

  // hasError(arrayName: 'candidatosM' | 'candidatosH', index: number, field: string, error: string) {
  //   const control = this[arrayName].at(index).get(field);
  //   return control?.hasError(error) && control?.touched;
  // }
}
