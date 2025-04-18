import { Component, inject, OnInit } from '@angular/core';
import { Catalogos } from '../../../shared/interfaces/catalogos.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Operaciones } from '../../interfaces/operiaciones.interface';
import { OperacionesService } from '../../services/operaciones.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-cierre-operaciones-page',
  templateUrl: './inicio-cierre-operaciones-page.component.html',
  styleUrl: './inicio-cierre-operaciones-page.component.css'
})
export class InicioCierreOperacionesPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private operacionesService = inject(OperacionesService);
  private validatorsService = inject(ValidatorsService);


  public myForm = this.fb.group({
    operaciones: this.fb.array([])
  })

  public gt:Catalogos[] = [];
  public lista_operaciones:Operaciones[] | undefined;
  public editing_values:boolean[] = [];
  public isEditing:boolean = false;
  public isAdded:boolean = false;
  public fecha_actual:string = '';

  get operaciones():FormArray {
    return this.myForm.get('operaciones') as FormArray;
  }

  get inicio_operaciones():boolean {
    return localStorage.getItem('iOp')! == 'true' ? true : false;
  }

  get conclusion_operaciones():boolean {
    return localStorage.getItem('cOp')! == 'true' ? true : false;
  }

  ngOnInit(): void {
    let fecha = new Date();

    this.fecha_actual = `${fecha.getFullYear()}-${fecha.getMonth() + 1 < 10 ? '0'+(fecha.getMonth()+1) : fecha.getMonth()}-${fecha.getDate() < 10 ? '0'+fecha.getDate() : fecha.getDate()}`;
    console.log(this.fecha_actual);
    for(let i = 1; i < 4; i++) {
      this.gt.push({id:i.toString(), descripcion:i.toString()});
    }
    this.getListaOperaciones()
  }

  getListaOperaciones = ():void =>  {
    this.lista_operaciones = [];
    this.operacionesService.getListaOperaciones()
    .subscribe(res => {
      this.lista_operaciones = res.datos as Operaciones[];
      this.patchRegistroOperaciones(this.lista_operaciones)
      Object.keys(this.myForm.controls).forEach(key => {
        this.myForm.get(key)?.disable();
      })
    })
  }

  patchRegistroOperaciones = (operaciones:Operaciones[]):void => {
    this.editing_values = [];
    operaciones.forEach(operacion => {
      this.editing_values.push(false);
      this.operaciones.push(this.fb.group({
        id_actividad:[operacion.id_actividad],
        fecha_hora_inicio:[operacion.fecha_hora_inicio, [Validators.required]],
        fecha_hora_fin:[operacion.fecha_hora_fin]
      }))
    })
  }

  addNewRegistroOperaciones = ():void =>  {

    if(this.lista_operaciones!.length > 0) {
      if(this.lista_operaciones![this.lista_operaciones!.length-1].fecha_hora_fin == null) {
        Swal.fire({
          icon:'warning',
          title:'¡Atención!',
          text:'Para registrar una nueva fecha de inicio/conclusión de actividades antes de debe concluír la última fecha registrada anteriormente',
          confirmButtonText:'Entendido'
        })
        return;
      }

      if(this.lista_operaciones![this.lista_operaciones!.length-1].fecha_hora_fin.split(' ')[0] == this.fecha_actual) {
        Swal.fire({
          icon:'error',
          title:'¡Denegado!',
          text:'No se permite realizar más de un registro de actividades por día',
          confirmButtonText:'Entendido'
        })
        return;
      }
    }

    if(this.isEditing) {
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'No se permite agregar un nuevo registro de operaciones cuando alguno se encuentra en edición.',
        confirmButtonText:'Entendido'
      })
      return;
    }

    if(!this.isAdded) {
      this.operaciones.push(this.fb.group({
        id_actividad:[''],
        fecha_hora_inicio:['', [Validators.required]],
        fecha_hora_fin:['']
      }))
      this.isAdded = true;
      this.editing_values.push(true);
    } else {
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'Solo se permite agregar un registro de operaciones a la vez.',
        confirmButtonText:'Entendido'
      })
    }
  }

  remove = (index:number, id_actividad:number):void => {
    this.operacionesService.deleteRegistroOperaciones(id_actividad)
    .subscribe(res => {
      Swal.fire({
        icon: res.success ? 'success' : 'error',
        title: res.success ? '¡Correcto!' : '¡Error!',
        text: res.msg,
        showConfirmButton: false,
        timer: 2300
      }).then(() => {
        if(res.success) {
          this.operaciones.clear();
          this.getListaOperaciones();
          this.editing_values.splice(index,1);
          this.isAdded = false;
          this.isEditing = false;
          this.myForm.markAsUntouched();
        }
      })
    })
  }

  removeRegistroOperaciones = (index:number, id_actividad:string):void => {
    console.log(id_actividad);
    if(id_actividad !== '') {
      if(this.isEditing || this.isAdded) {
        Swal.fire({
          icon:'info',
          title:'¡Atención!',
          text:'No se puede eliminar un registro de operaciones cuando alguno se encuentra en registro o edición.',
          confirmButtonText:'Entendido'
        })
        return;
      }

      if(this.myForm.get('operaciones')?.get(index.toString()))

      Swal.fire({
        icon:'question',
        title:'¿Confirmar eliminación?',
        text:'Está a punto de eliminar el registro de esta operación, ¿Desea confirmar?',
        showCancelButton:true,
        cancelButtonText:'Cancelar',
        confirmButtonText:'Confirmar'
      }).then((result) => {
        if(result.isConfirmed) {
          this.remove(index, +id_actividad);
        }
      })
    } else {
      this.operaciones.removeAt(index);
      this.isAdded = false;
      this.isEditing = false;
    }
  }

  saveRegistroOperaciones = (index:number):void =>  {
    console.log(this.myForm.get('operaciones')?.get(index.toString())?.get('fecha_hora_fin')?.value);
    console.log(this.myForm.get('operaciones')?.get(index.toString())?.get('fecha_hora_inicio')?.value.split(' ')[0]);
    console.log(this.myForm.get('operaciones')?.get(index.toString())?.value);
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

    if(this.myForm.get('operaciones')?.get(index.toString())?.get('fecha_hora_fin')?.value !== "") {
      Swal.fire({
        icon:'info',
        title:'¡Atención!',
        text:'En este momento solo está permitido el registro de la fecha y hora del inicio de actividades',
        confirmButtonText:'Entendido'
      })
      return;
    }

    Swal.fire({
      icon:'question',
      title:'¿Confirmar registro?',
      text:'Está a punto de realizar el registro de esta operación, ¿Desea confirmar?',
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Confirmar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.operacionesService.saveDatosOperacion(this.myForm.get('operaciones')?.get(index.toString())?.value as Operaciones, 1)
        .subscribe(res => {
          Swal.fire({
            icon: res.success ? 'success' : 'error',
            title: res.success ? '¡Correcto!' : '¡Error!',
            text: res.msg,
            showConfirmButton:false,
            timer:2300
          }).then(() => {
            if(res.success) {
              this.myForm.get('operaciones')?.get(index.toString())?.disable();
              this.isEditing = false;
              this.operaciones.clear();
              this.getListaOperaciones();
              this.editing_values[index] = false;
              this.isAdded = false;
              this.myForm.markAsUntouched();
            }
          })
        })
      }
    })
  }

  editRegistroOperaciones = (index:number):void => {
    console.log(this.myForm.get('operaciones')?.get(index.toString())?.value)
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
      text:'Está a punto de realizar la edición de este registro de operaciones, ¿Desea confirmar?',
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Confirmar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.operacionesService.saveDatosOperacion(this.myForm.get('operaciones')?.get(index.toString())?.value as Operaciones, 2)
        .subscribe(res => {
          Swal.fire({
            icon: res.success ? 'success' : 'error',
            title: res.success ? '¡Correcto!' : '¡Error!',
            text: res.msg,
            showConfirmButton:false,
            timer:2300
          }).then(() => {
            if(res.success) {
              this.myForm.get('operaciones')?.get(index.toString())?.disable();
              this.isEditing = false;
              this.operaciones.clear();
              this.getListaOperaciones();
              this.editing_values[index] = false;
              this.isAdded = false;
              this.myForm.markAsUntouched();
            }
          })
        })
      } else {
        this.myForm.get('operaciones')?.get(index.toString())?.disable();
        this.isEditing = false;
        this.editing_values[index] = false;
      }
    })
  }

  edit = (index:number):void => {
    if(this.isAdded) {
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'La edición de datos de las operaciones no está permitida mientras se está realizando el registro de una nueva operación.',
        confirmButtonText:'Entendido'
      })
      return;
    }

    if(this.isEditing) {
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'Solo se permite editar los datos de una sola operación a la vez, se requiere que la edición del registro de la operación actual esté terminada.',
        confirmButtonText:'Entendido'
      })
      return;
    } else {
      this.editing_values[index] = true;
      if(!this.isEditing) {
        this.myForm.get('operaciones')?.get(index.toString())?.enable();
      }
      this.isEditing = true;
    }
  }

  // Funciones de validación de los campos del formulario
  isValidField = (array:string, position:string, field:string): boolean => {
    return this.validatorsService.isValidVotosField(this.myForm, array, position,field)!;
  }

  getFieldErrors = (array:string, position:string, field:string): string => {
    return this.validatorsService.getFieldPositionErrors(this.myForm, array, position,field)!;
  }
}
