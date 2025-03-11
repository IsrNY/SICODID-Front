// import { Component, inject, OnInit } from '@angular/core';
// import { CatalogosService } from '../../../shared/services/catalogos.service';
// import { FormBuilder, Validators } from '@angular/forms';
// import { Integrantes } from '../../interfaces/integrantes.interface';
// import { Catalogos } from '../../../shared/interfaces/catalogos.interface';
// import { IntegrantesService } from '../../services/integrantes.service';
// import Swal from 'sweetalert2';
// import { ValidatorsService } from '../../../shared/services/validators.service';

// declare var $:any;

// @Component({
//   selector: 'distrital-grupos-trabajo',
//   templateUrl: './grupos-trabajo.component.html',
//   styleUrl: './grupos-trabajo.component.css'
// })
// export class GruposTrabajoComponent implements OnInit {
//   private catalogosService = inject(CatalogosService);
//   private integrantesService = inject(IntegrantesService);
//   private validatorsService = inject(ValidatorsService);
//   private fb = inject(FormBuilder);

//   public myForm = this.fb.group({
//     id_integrante:[0],
//     nombres:['',[Validators.required]],
//     apellido1:['',[Validators.required]],
//     apellido2:['',[Validators.required]],
//     id_cargo:['',[Validators.required]],
//     id_funcion:['',[Validators.required]]
//   });

//   public cargos:Catalogos[] = [];
//   public funciones:Catalogos[] = [];
//   public integrantes:Integrantes[] = [];
//   public integrante:Integrantes | undefined;
//   public icon:string = '';


//   ngOnInit(): void {
//     this.myForm.get('id_funcion')?.disable();
//     this.getIntegrantes();
//     $('#nombre').select();

//     this.catalogosService.getCatalogo('cargos')
//     .subscribe(res => {
//       this.cargos = res.datos as Catalogos[];
//     });
//   }

//   resetValues() {
//     this.myForm.patchValue({
//       id_integrante:0,
//       nombres:'',
//       apellido1:'',
//       apellido2:'',
//       id_cargo:'',
//       id_funcion:''
//     });
//     this.myForm.markAsUntouched();
//     this.myForm.get('id_funcion')?.disable();
//     this.integrante = undefined;
//     $('#nombre').select();
//   }

//   getFunciones() {
//     this.myForm.patchValue({id_funcion:''});
//     this.catalogosService.getCatalogo(`funciones?id_cargo=${this.myForm.get('id_cargo')?.value!}`)
//     .subscribe(res => {
//       if(!res.success) {
//         this.myForm.get('id_funcion')?.disable();
//       } else {
//         this.myForm.get('id_funcion')?.enable();
//         this.funciones = res.datos as Catalogos[];
//       }
//     })
//   }

//   getIntegrantes() {
//     this.integrantes = [];
//     this.integrantesService.getIntegrantes()
//     .subscribe(res => {
//       this.integrantes = res.datos as Integrantes[];
//     })
//   }

//   saveIntegrante() {
//     if(this.myForm.invalid) {
//       this.myForm.markAllAsTouched();
//       Swal.fire({
//         icon:'warning',
//         title:'¡Atención!',
//         text:'No es posible realizar un nuevo registro si en el formulario se muestran validaciones pendientes de ser atendidas.',
//         confirmButtonText:'Entendido'
//       })
//       return;
//     }

//     Swal.fire({
//       icon:'question',
//       title:'¿Confirmar el registro?',
//       text:'Es necesario confirmar el registro del nuevo integrante, ¿Desea confirmar?',
//       showCancelButton:true,
//       cancelButtonText:'Cancelar',
//       confirmButtonText:'Confirmar'
//     }).then((result) => {
//       if(result.isConfirmed) {
//         this.integrantesService.saveIntegrante(this.myForm.value as Integrantes)
//         .subscribe(res => {
//           Swal.fire({
//             icon:res.success?'success' : 'error',
//             title:res.success? '¡Correcto!' : '¡Error!',
//             text:res.msg,
//             showConfirmButton:false,
//             timer:3000
//           }).then(() => {
//             if(res.success) {
//               this.resetValues();
//               this.getIntegrantes();
//             }
//           })
//         })
//       }
//     })
//   }

//   updtIntegrante() {
//     this.integrantesService.updateIntegrante(this.myForm.value as Integrantes)
//     .subscribe(res => {
//       Swal.fire({
//         icon:res.success?'success' : 'error',
//         title:res.success? '¡Correcto!' : '¡Error!',
//         text:res.msg,
//         showConfirmButton:false,
//         timer:3000
//       }).then(() => {
//         if(res.success) {
//           this.resetValues();
//           this.getIntegrantes();
//         }
//       })
//     })
//   }

//   editIntegrante(id_integrante:number) {
//     this.integrantesService.getIntegrante(id_integrante)
//     .subscribe(res => {
//       this.integrante = res.datos as Integrantes;
//       this.myForm.patchValue(this.integrante);
//       this.getFunciones();
//       this.myForm.patchValue({id_funcion:this.integrante.id_funcion})
//     })
//   }

//   deleteIntegrante(id_integrante:number) {
//     Swal.fire({
//       icon:'warning',
//       title:'¡Atención!',
//       text:'La eliminación de un integrante es un proceso irreversible, ¿Desea confirmar la eliminación?',
//       showCancelButton:true,
//       cancelButtonText:'Cancelar',
//       confirmButtonText:'Confirmar'
//     }).then((result) => {
//       if(result.isConfirmed) {
//         if(id_integrante === this.myForm.get('id_integrante')?.value!) {
//           Swal.fire({
//             icon:'info',
//             title:'¡Atención!',
//             text:'El integrante que intenta eliminar se encuentra en edición, ¿Confirmar eliminación?',
//             showCancelButton:true,
//             cancelButtonText:'Cancelar',
//             confirmButtonText:'Confirmar'
//           }).then((result) => {
//             if(result.isConfirmed) {
//               this.resetValues();
//               this.integrantesService.deleteIntegrante(id_integrante)
//               .subscribe(res => {
//                 Swal.fire({
//                   icon:res.success?'success' : 'error',
//                   title:res.success? '¡Correcto!' : '¡Error!',
//                   text:res.msg,
//                   showConfirmButton:false,
//                   timer:3000
//                 }).then(() => {
//                   this.getIntegrantes();
//                   this.resetValues();
//                 })
//               })
//             } else {
//               return;
//             }
//           })
//         } else {
//           this.integrantesService.deleteIntegrante(id_integrante)
//           .subscribe(res => {
//             Swal.fire({
//               icon:res.success?'success' : 'error',
//               title:res.success? '¡Correcto!' : '¡Error!',
//               text:res.msg,
//               showConfirmButton:false,
//               timer:3000
//             }).then(() => {
//               this.getIntegrantes();
//               this.resetValues();
//             })
//           })
//         }
//       }
//     })
//   }

//   next(event:any, id:string):void {
//     let keyCode = event.keyCode;

//     if(keyCode == 13) {
//       if(id == 'ape1' || id == 'ape2') {
//         $(`#${id}`).select();
//       } else {
//         $(`#${id}`).focus();
//       }
//     }
//   }

//   addMove(id:number):void {
//     $(`#${id}`).toggleClass(' ')
//   }

//   isValidField(field:string) {
//     return this.validatorsService.isValidField(this.myForm,field);
//   }

//   getFieldErrors(field:string) {
//     return this.validatorsService.getFieldErrors(this.myForm,field);
//   }
// }

import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CatalogosService } from '../../../shared/services/catalogos.service';
import { IntegrantesService } from '../../services/integrantes.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { Integrantes } from '../../interfaces/integrantes.interface';
import { Catalogos } from '../../../shared/interfaces/catalogos.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'distrital-grupos-trabajo',
  templateUrl: './grupos-trabajo.component.html',
  styleUrl: './grupos-trabajo.component.css'
})
export class GruposTrabajoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private catalogosService = inject(CatalogosService);
  private integrantesService = inject(IntegrantesService);
  private validatorsService = inject(ValidatorsService);

  public myForm = this.fb.group({
    integrantes: this.fb.array([])
  });

  public lista_integrantes:Integrantes[] = [];
  public integrante:Integrantes | undefined;
  public cargos:Catalogos[] = [];
  public funciones:Catalogos[] = [];
  public isEditing:boolean = false;


  get integrantes():FormArray {
    return this.myForm.get('integrantes') as FormArray;
  }

  ngOnInit():void  {
    this.getCargos();
    this.getIntegrantes();
  }

  patchIntegrantes = (integrantes:Integrantes[]) => integrantes.forEach(integrante => this.integrantes.push(this.fb.group({
    id_integrante:[integrante.id_integrante],
    nombres:[integrante.nombres, [Validators.required]],
    apellido1:[integrante.apellido1, [Validators.required]],
    apellido2:[integrante.apellido2, [Validators.required]],
    id_cargo:[integrante.id_cargo, [Validators.required]],
    id_funcion:[integrante.id_funcion, [Validators.required]],
    cargo:[integrante.cargo],
    funcion:[integrante.funcion],
  })));

  addIntegrante = () => {
    this.integrantes.push(this.fb.group({
      id_integrante:[''],
      nombres:['', [Validators.required]],
      apellido1:['', [Validators.required]],
      apellido2:['', [Validators.required]],
      id_cargo:['', [Validators.required]],
      id_funcion:['', [Validators.required]],
      cargo:[''],
      funcion:[''],
    }))
  }

  deleteIntegrante = (index:number, id_integrante:string) => {
    if(id_integrante !== '') {
      Swal.fire({
        icon:'question',
        title:'¿Confirmar eliminación?',
        text:'Está a punto de realizar la eliminación del integrante, ¿Desea confirmar?',
        showCancelButton:true,
        cancelButtonText:'Cancelar',
        confirmButtonText:'Confirmar'
      }).then((result) => {
        if(result.isConfirmed) {
          this.integrantesService.deleteIntegrante(+id_integrante)
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
              }
            })
          })
        }
      })
    } else {
      this.integrantes.removeAt(index);
    }
  }

  saveIntegrante(index:number) {
    Swal.fire({
      icon:'question',
      title:'¿Confirmar registro?',
      text:'Está a punto de realizar el registro del integrante, ¿Desea confirmar?',
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Confirmar'
    }).then((result) => {
      if(result.isConfirmed) {

      }
    })
  }

  editIntegrante(index:number):void {
    // console.log(this.myForm.get('integrantes')?.get(index.toString())?.get('id_cargo')?.value)
    if(!this.isEditing) {
      this.myForm.get('integrantes')?.get(index.toString())?.enable();
      this.getFunciones(index);
    }
    this.isEditing = true;
  }

  getCargos():void {
    this.catalogosService.getCatalogo('cargos')
    .subscribe(res => {
      this.cargos = res.datos as Catalogos[];
    })
  }

  getFunciones(index:number):void {
    this.catalogosService.getCatalogo(`funciones?id_cargo=${this.myForm.get('integrantes')?.get(index.toString())?.get('id_cargo')?.value}`)
    .subscribe(res => {
       this.funciones = res.datos as Catalogos[];
       console.log(this.funciones);
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

}
