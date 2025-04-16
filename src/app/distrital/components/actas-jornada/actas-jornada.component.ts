import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CatalogosService } from '../../../shared/services/catalogos.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Catalogos } from '../../../shared/interfaces/catalogos.interface';
import { ActaJornada, DatosActa } from '../../interfaces/actas.interface';
import { ActasService } from '../../services/actas.service';
import { ScrollButtonComponent } from '../../../shared/components/scroll-button/scroll-button.component';
import { ValidatorsService } from '../../../shared/services/validators.service';
import Swal from 'sweetalert2';
import { ModifyDateHourPipe } from '../../../shared/pipes/modify-date-hour.pipe';

declare var $:any;

@Component({
  selector: 'distrital-actas-jornada',
  templateUrl: './actas-jornada.component.html',
  styleUrl: './actas-jornada.component.css'
})
export class ActasJornadaComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  private catalogosService = inject(CatalogosService);
  private actasService = inject(ActasService);
  private validatorsService = inject(ValidatorsService);


  @Input()
  public datos_acta?:DatosActa;

  @Output()
  public recharge = new EventEmitter<boolean>();

  public myForm = this.fb.group({
    id_seccion:[''],
    tipo_casilla:[''],
    personas_votaron:['', [Validators.required]],
    votos_tribunal:['', [Validators.required]],
    votos_magistraturas:['', [Validators.required]],
    votos_juzgados:['', [Validators.required]],
    punto_escrutinio:['', [Validators.required]]
  })

  public tipos_eleccion:Catalogos[] = [];
  public puntos_escrutinio:Catalogos[] = [];
  public acta_jornada?: ActaJornada;
  public option:number = 0;

  ngOnInit(): void {
    for(let i = 1; i < 5; i++) {
      this.puntos_escrutinio.push({id:i.toString(),descripcion:i.toString()});
    }
    this.getTiposEleccion()
  }

  ngOnChanges(): void {
    if(this.datos_acta !== undefined && this.datos_acta.operacion == 2) {
      this.getDatosActa();
      this.option = 2;
    } else {
      this.option = 1;
    }

    console.log(this.option)
  }

  getTiposEleccion() {
    this.catalogosService.getCatalogo('tipo-eleccion')
    .subscribe(res => {
      this.tipos_eleccion = res.datos as Catalogos[];
    })
  }

  getDatosActa() {
    this.actasService.getActas(this.datos_acta!,this.datos_acta?.tipo_eleccion!, 'actaInfo')
    .subscribe(res => {
      this.acta_jornada = res.datos as ActaJornada;
      this.myForm.patchValue(this.acta_jornada);
    })
  }

  saveActaJornada() {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'Todos los campos marcados como obligatorios deben contener la información requerida',
        confirmButtonText:'Corregir formulario'
      })
      return;
    }
    this.myForm.patchValue({id_seccion:this.datos_acta?.id_seccion, tipo_casilla: this.datos_acta?.tipo_casilla})

    Swal.fire({
      icon:'question',
      title:`¿Confirmar ${this.option == 1 ? 'captura' : 'actualización'}?`,
      text:`Está a punto de realizar ${this.option == 1 ? 'la captura' : 'una actualización'} del acta, ¿Desea confirmar?`,
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Confirmar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.actasService.saveActas(this.myForm.value as ActaJornada, this.datos_acta!, undefined, this.option, 'acta')
        .subscribe(res => {
          Swal.fire({
            icon:res.success ? 'success' : 'error',
            title: res.success   ? '¡Correcto!' : '¡Error!',
            text: res.msg,
            showConfirmButton:false,
            timer:2300
          }).then(() => {
            if(res.success) {
              if(this.option == 1) {
                this.option = 2;
              }
              this.recharge.emit(true);
              $('#actasJornada').modal('hide');
              this.datos_acta = undefined;
              this.myForm.reset();
              this.myForm.patchValue({punto_escrutinio:''});
              this.option = 0;
            }
          })
        })
      }
    })
  }

  closeModal() {
    $('#actasJornada').modal('hide');
    this.datos_acta = undefined;
    this.myForm.reset();
    this.myForm.patchValue({punto_escrutinio:''});
    this.option = 0;
  }

  bloquear(event:KeyboardEvent) {
    if(event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
    }
  }

  next(event:any, id:string) {
    let keyCode = event.keyCode;

    if(keyCode == 13) {
      if(id !== 'pe') {
        $(`#${id}`).select();
      } else {
        $(`#${id}`).focus();
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
}
