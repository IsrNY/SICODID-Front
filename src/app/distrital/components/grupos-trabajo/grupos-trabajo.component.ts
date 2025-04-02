import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from '../../../shared/services/catalogos.service';
import { IntegrantesService } from '../../services/integrantes.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { Integrantes } from '../../interfaces/integrantes.interface';
import { Catalogos } from '../../../shared/interfaces/catalogos.interface';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';

declare var $:any;

@Component({
  selector: 'distrital-grupos-trabajo',
  templateUrl: './grupos-trabajo.component.html',
  styleUrl: './grupos-trabajo.component.css'
})
export class GruposTrabajoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private catalogosService = inject(CatalogosService);
  private integrantesService = inject(IntegrantesService);
  private authService = inject(AuthService);
  private validatorsService = inject(ValidatorsService);

  public myForm = this.fb.group({
    integrantes: this.fb.array([])
  });

  public lista_integrantes:Integrantes[] = [];
  public integrante:Integrantes | undefined;
  public editing_values:boolean[] = [];
  public cargos:Catalogos[] = [];
  public funciones?:Catalogos[] | [];
  public gt:Catalogos[] = [];
  public isEditing:boolean = false;
  public isAdded:boolean = false;
  public show:boolean = false;

  get integrantes():FormArray {
    return this.myForm.get('integrantes') as FormArray;
  }

  get distrito() {
    return this.authService.distrito;
  }

  ngOnInit():void  {
    for(let i = 1; i < 9; i++) {
      this.gt.push({id: i.toString(), descripcion: i.toString()});
    }
    this.getCargos();
    this.getIntegrantes();

  }

  patchIntegrantes = (integrantes:Integrantes[]) => {
    this.editing_values = [];
    integrantes.forEach(integrante => {
      this.editing_values.push(false);
      this.integrantes.push(this.fb.group({
        id_integrante:[integrante.id_integrante],
        nombres:[integrante.nombres, [Validators.required]],
        apellido1:[integrante.apellido1, [Validators.required]],
        apellido2:[integrante.apellido2, [Validators.required]],
        id_cargo:[integrante.id_cargo, [Validators.required]],
        id_funcion:[integrante.id_funcion, [Validators.required]],
        gt:[integrante.gt,[Validators.required]],
        turno:['1'],
        cargo:[integrante.cargo],
        funcion:[integrante.funcion],
        editing:[false]
    }))
    });
  }

  addIntegrante = () => {
    if(this.isEditing) {
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'No está permitido agregar un nuevo integrante mientras se está editando uno existente, finalizar la edición para registrar uno nuevo.',
        confirmButtonText:'Entendido'
      })
      return;
    } else {
      if(!this.isAdded) {
        this.integrantes.push(this.fb.group({
          id_integrante:[''],
          nombres:['', [Validators.required]],
          apellido1:['', [Validators.required]],
          apellido2:['', [Validators.required]],
          id_cargo:['', [Validators.required]],
          id_funcion:['', [Validators.required]],
          gt:['',[Validators.required]],
          // turno:['',[Validators.required]],
          turno:[''],
          cargo:[''],
          funcion:[''],
          editing:[false]
        }))
        this.isAdded = true;
        this.editing_values.push(true);

        let largo = this.integrantes.length;
        $(`2`).focus()
      } else {
        Swal.fire({
          icon:'warning',
          title:'¡Atención!',
          text:'Solo se permite agregar un integrante a la vez, se debe terminar el registro del integrante actual, y posteriormente, iniciar un registro nuevo.',
          confirmButtonText:'Entendido'
        })
      }
    }
  }

  delete(index:number, id_integrante:number) {
    this.integrantesService.deleteIntegrante(id_integrante)
    .subscribe(res => {
      Swal.fire({
        icon: res.success ? 'success' : 'error',
        title: res.success ? '¡Correcto!' : '¡Error!',
        text:res.msg,
        showConfirmButton:false,
        timer:2300
      }).then(() => {
        if(res.success) {
          this.integrantes.clear();
          this.getIntegrantes();
          this.editing_values.splice(index, 1);
          this.isEditing = false;
          this.isAdded = false;
          this.myForm.markAsUntouched();
        }
      })
    })
  }

  deleteIntegrante = (index:number, id_integrante:string) => {
    if(id_integrante !== '') {
      if(this.editing_values[index] == true) {
        Swal.fire({
          icon:'warning',
          title:'¡Atención!',
          text:'El integrante que está intentando eliminar se encuentra en edición, ¿Está seguro/a de confirmar la acción?',
          showCancelButton:true,
          cancelButtonText:'No',
          confirmButtonText:'Sí'
        }).then((result) => {
          if(result.isConfirmed) {
            this.delete(index, +id_integrante);
          }
        })
        return;
      } else if(this.isEditing || this.isAdded) {
        Swal.fire({
          icon:'info',
          title:'¡Atención!',
          text:'La eliminación de un integrante no está permitida cuando se está editando uno existente o registrando uno nuevo.',
          confirmButtonText:'Entendido'
        })
        return;
      }
      Swal.fire({
        icon:'question',
        title:'¿Confirmar eliminación?',
        text:'Está a punto de realizar la eliminación del integrante, ¿Desea confirmar?',
        showCancelButton:true,
        cancelButtonText:'Cancelar',
        confirmButtonText:'Confirmar'
      }).then((result) => {
        if(result.isConfirmed) {
          this.delete(index, +id_integrante);
        }
      })
    } else {
      this.integrantes.removeAt(index);
      this.isAdded = false;
    }
  }

  saveIntegrante(index:number) {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'Todos los campos marcados como obligatorios deben estar completos para realizar esta acción.',
        confirmButtonText:'Entendido'
      })
      return;
    }
    Swal.fire({
      icon:'question',
      title:'¿Confirmar registro?',
      text:'Está a punto de realizar el registro del integrante, ¿Desea confirmar?',
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Confirmar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.integrantesService.saveIntegrante(this.myForm.get('integrantes')?.get(index.toString())?.value as Integrantes)
        .subscribe(res => {
          Swal.fire({
            icon: res.success ?'success' : (res.msg == 'El integrante ya existe' ? 'warning' : 'error'),
            title: res.success ? '¡Correcto!' : (res.msg == 'El integrante ya existe' ? '¡Atención!' : '¡Error!'),
            text:res.msg,
            showConfirmButton:false,
            timer:2300
          }).then(() => {
            if(res.success) {
              this.myForm.get('integrantes')?.get(index.toString())?.disable();
              this.isEditing = false;
              this.integrantes.clear();
              this.getIntegrantes();
              this.editing_values[index] = false;
              this.isAdded = false;
              this.funciones = [];
              this.myForm.markAsUntouched();
            }
          })
        })
      }
    })
  }

  editIntegrante(index:number):void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'Todos los campos marcados como obligatorios deben estar completos para realizar esta acción.',
        confirmButtonText:'Entendido'
      })
      return;
    }
    Swal.fire({
      icon:'question',
      title:'¿Confirmar edición?',
      text:'Está a punto de realizar la edición del integrante, ¿Desea confirmar?',
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Confirmar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.integrantesService.updateIntegrante(this.myForm.get('integrantes')?.get(index.toString())?.value as Integrantes)
        .subscribe(res => {
          Swal.fire({
            icon: res.success ?'success' : 'error',
            title: res.success ? '¡Correcto!' : '¡Error!',
            text:res.msg,
            showConfirmButton:false,
            timer:2300
          }).then(() => {
            if(res.success) {
              this.myForm.get('integrantes')?.get(index.toString())?.disable();
              this.isEditing = false;
              this.integrantes.clear();
              this.getIntegrantes();
              this.editing_values[index] = false;
              this.isAdded = false;
              this.myForm.markAsUntouched();
            }
          })
        })
      } else {
        this.myForm.get('integrantes')?.get(index.toString())?.disable();
        this.isEditing = false;
        this.editing_values[index] = false;
      }
    })
  }

  edit(index:number):void {
    if(this.isAdded) {
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'La edición de integrantes no está permitida mientras se está realizando el registro de un nuevo integrante.',
        confirmButtonText:'Entendido'
      })
      return;
    }
    if(this.isEditing) {
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'Solo se permite editar la información de un integrante a la vez, favor de finalizar los cambios e iniciar la edición de uno distinto.',
        confirmButtonText:'Entendido'
      })
      return;
    } else {
      this.editing_values[index] = true;
      if(!this.isEditing) {
        this.myForm.get('integrantes')?.get(index.toString())?.enable();
        this.getFunciones(index, true);
      }
      this.isEditing = true;
    }
  }

  getCargos():void {
    this.catalogosService.getCatalogo('cargos')
    .subscribe(res => {
      this.cargos = res.datos as Catalogos[];
    })
  }

  getFunciones(index:number, reset:boolean | undefined = undefined):void {
    if(!reset) {
      this.myForm.get('integrantes')?.get(index.toString())?.patchValue({id_funcion:''});
    }
    this.funciones = undefined;
    this.catalogosService.getCatalogo(`funciones?id_cargo=${this.myForm.get('integrantes')?.get(index.toString())?.get('id_cargo')?.value}`)
    .subscribe(res => {
       this.funciones = res.datos as Catalogos[];
     })
  }

  getIntegrantes():void {
    this.lista_integrantes = [];
    this.integrantesService.getIntegrantes()
    .subscribe(res => {
       this.lista_integrantes = res.datos as Integrantes[];
       this.patchIntegrantes(this.lista_integrantes);
       Object.keys(this.integrantes.controls).forEach(key => {
        this.integrantes.get(key)?.disable();
      })
     })
  }

  isValidField(array:string, position:string, field:string) {
    return this.validatorsService.isValidVotosField(this.myForm, array, position, field);
  }

  getFieldErrors(array:string, position:string, field:string) {
    return this.validatorsService.getFieldPositionErrors(this.myForm, array, position, field);
  }
}
