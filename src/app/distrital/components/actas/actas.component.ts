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
    tipo_eleccion:[''],
    total_votos:['', [Validators.required]],
    votos_nulos: ['',[Validators.required]],
    recuadros_nu: ['', [Validators.required]],
    candidatos: this.fb.array([])
  });

  public tipos_eleccion:Catalogos[] = [];
  public tipo_eleccion:Catalogos[] = [];
  public acta:Actas | undefined;
  public opcion:number = 0;
  public option:number = 0;

  @Input()
  public datos_acta:DatosActa | undefined;

  @Output()
  public reload = new EventEmitter<boolean>();

  get eleccion() {
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
    switch(this.opcion) {
      default:
        this.myForm.patchValue({tipo_eleccion:this.datos_acta?.tipo_eleccion!.toString()});
        if(this.eleccion !== '') {
          this.getDatosActa();
          // this.getTiposEleccionSA(this.datos_acta?.id_seccion.toString()!, this.datos_acta?.tipo_casilla!);
        }
      break;
    }
  }

  getTiposEleccion() {
    this.catalogosService.getCatalogo('tipo-eleccion')
   .subscribe(res => {
    this.tipos_eleccion = res.datos as Catalogos[];
   });
  }

  getDatosActa() {
    this.acta = undefined;
    this.candidatos.clear();
    this.myForm.markAsUntouched();
    this.actasService.getActas(this.datos_acta!, +this.eleccion)
    .subscribe(res => {
      this.acta = res.datos as Actas;
      this.option = this.acta.total_votos.length == 0 ? 1 : 2;
      if(this.datos_acta?.operacion == 2 && this.acta.total_votos == '') {
        Swal.fire({
          icon:'info',
          title:'¡Atención!',
          text:'Esta Hoja de Operaciones aún no ha sido capturada.',
          showConfirmButton:false,
          timer:2000
        })
        this.acta = undefined;
        this.myForm.reset();
        this.myForm.patchValue({tipo_eleccion:''});
        return;
      }
      this.myForm.patchValue(this.acta);
      this.patchCandidatos(this.acta.candidatos);
    })
  }

  patchCandidatos = (candidatos:Datos[]) => candidatos.forEach(candidato => this.candidatos.push(this.fb.group({
    id_candidato:[candidato.id_candidato],
    nombre:[candidato.nombre],
    postula:[candidato.postula],
    tipo_materia:[candidato.tipo_materia],
    votos:[candidato.votos, [Validators.required]],
    genero:[candidato.genero]
  })))

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
      title:`¿Confirmar ${this.option == 1 ? 'captura' : 'actualización'}?`,
      text:`Está a punto de realizar ${this.option == 1 ? 'la captura' : 'una actualización'} del acta, ¿Desea confirmar?`,
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Confirmar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.actasService.saveActas(this.myForm.value as Actas, this.datos_acta as DatosActa, +this.eleccion, this.option)
        .subscribe(res => {
          Swal.fire({
            icon:res.success ? 'success' : 'error',
            title: res.success ? '¡Correcto!' : '¡Error!',
            text: res.msg,
            showConfirmButton: false,
            timer:2350
          }).then(() => {
            if(res.success) {
              if(this.option == 1) {
                this.option = 2;
              }
              this.myForm.markAsUntouched();
            }
          })
        })
      }
    })
  }

  resetForm():void {
    this.acta = undefined;
    this.myForm.reset();
    this.candidatos.clear();
    this.myForm.markAsUntouched();
    this.option = 0;
  }

  closeModal() {
    $('#actas').modal('hide');
    this.reload.emit(true);
    this.myForm.markAsUntouched();
    this.resetForm();
  }

   bloquear(event:KeyboardEvent) {
    if(event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
    }
  }

  next(event:any, id:string) {
    let keyCode = event.keyCode;

    if(keyCode == 13) {
      if(id !== 'submit') {
        $(`#${id}`).select();
      } else {
        $('#save').focus();
        this.saveActa();
      }
    }
  }

  enter(event:any, id:string){
    let keyCode = event.keyCode;

    if(keyCode == 13) {
      console.log(id, this.candidatos.length)
      if(+id < this.candidatos.length) {
        $(`#${id}`).select();
      } else {
        $('#nulos').select();
      }
    }
  }

  limit(event:any) {
    let charCode = event.charCode;

    if(charCode !== 8 || charCode !== 9) {
      let max = 4;

      if((charCode < 48 || charCode > 57 || event.target.value.length >= max)) return false;
    }
    return;
  }

  isValidField(field:string) {
    return this.validatorsService.isValidField(this.myForm,field);
  }

  getFieldErrors(field:string) {
    return this.validatorsService.getFieldErrors(this.myForm,field);
  }

  isValidVotosField(field:string, position:string, form_field:string):boolean {
    return this.validatorsService.isValidVotosField(this.myForm, field, position, form_field)!;
  }

  getFieldVotosErrors(field:string, position:string, form_field:string):string {
    return this.validatorsService.getFieldVotosErrors(this.myForm, field, position, form_field)!;
  }
}
