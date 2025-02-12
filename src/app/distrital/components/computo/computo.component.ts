import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ComputoService } from '../../services/computo.service';
import { Computo } from '../../interfaces/computo.interface';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ScrollButtonComponent } from '../../../shared/components/scroll-button/scroll-button.component';
import { VerifyService } from '../../../auth/services/verify.service';

declare var $:any;

@Component({
  selector: 'distrital-computo',
  templateUrl: './computo.component.html',
  styleUrl: './computo.component.css'
})
export class ComputoComponent implements OnInit {
  private location = inject(Location);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private computoService = inject(ComputoService);
  private authService = inject(AuthService);
  private verifyService = inject(VerifyService);

  get inicio_computo():boolean {
    return this.verifyService.inicio_computo;
  }

  get cierre_computo():boolean {
    return this.verifyService.cierre_computo;
  }

  get rol() {
    return this.authService.rol;
  }

  get loadStorage() {
    return localStorage.getItem('token');
  }

  get quorum_asistencia() {
    return ((this.myForm.get('spen_1')?.value! ? 1 : 0) + (this.myForm.get('spen_2')?.value! ? 1 : 0) + (this.myForm.get('spen_3')?.value! ? 1 : 0)
    + (this.myForm.get('spen_4')?.value! ? 1 : 0) + (this.myForm.get('spen_5')?.value! ? 1 : 0));
  }

  public myForm = this.fb.group({
    spen_1:[false],
    spen_2:[false],
    spen_3:[false],
    spen_4:[false],
    spen_5:[false],
    // quorum_asistencia:['', [Validators.required, Validators.maxLength(2)]],
    mc_prensa:[false],
    mc_radio:[false],
    mc_tv:[false],
    observaciones:['', [Validators.required, Validators.maxLength(250)]],
    fecha_sesion:['', [Validators.required]],
    hora_sesion:['', [Validators.required]],
  });

  public computo:string = '';
  private year:number = 0;

  ngOnInit(): void {
    let fecha = new Date();
    this.year = fecha.getFullYear();
    if(this.location.path().match('inicio_computo')) {
      this.computo = 'inicio';
      if(this.inicio_computo) {
        this.computoService.getComputo(this.computo)
        .subscribe(res => {
          this.myForm.patchValue(res.datos as Computo);
        })
      }
    } else {
      this.computo = 'cierre';
      if(this.cierre_computo) {
        this.computoService.getComputo(this.computo)
        .subscribe(res => {
          this.myForm.patchValue(res.datos as Computo);
        })
      }
    }
  }

  enviar() {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'Todos los campos marcados como obligatorios deben contener la información requerida.',
        confirmButtonText:'Entendido'
      })
      return;
    }

    if(this.year !== +this.myForm.get('fecha_sesion')?.value?.split('-')[0]!) {
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'¡El año seleccionado es inválido, intente con otro!',
        confirmButtonText:'Entendido'
      })
      return;
    }

    Swal.fire({
      icon:'question',
      title:`¿Confirmar ${this.computo}?`,
      text:`¿Está seguro/a de realizar el ${this.computo} de cómputo?`,
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Confirmar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.computoService.setComputo(this.myForm.value as Computo, this.computo)
        .subscribe(res => {
          Swal.fire({
            icon:res.success ? 'success' : 'error',
            title:res.success ? '¡Correcto!' : '¡Error!',
            text:res.msg,
            showConfirmButton:false,
            timer:2000
          }).then(() => {
            if(res.success) {
              this.router.navigateByUrl('distrital')
            }
          })
        })
      }
    })
  }

  actualizar() {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'Todos los campos marcados como obligatorios deben contener la información requerida.',
        confirmButtonText:'Entendido'
      })
      return;
    }

    if(this.year !== +this.myForm.get('fecha_sesion')?.value?.split('-')[0]!) {
      Swal.fire({
        icon:'warning',
        title:'¡Atención!',
        text:'¡El año seleccionado es inválido, intente con otro!',
        confirmButtonText:'Entendido'
      })
      return;
    }

    Swal.fire({
      icon:'question',
      title:'¿Confirmar actualización?',
      text:`¿Está seguro/a de realizar la actualización del ${this.computo} de cómputo?`,
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Confirmar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.computoService.updtComputo(this.myForm.value as Computo, this.computo)
        .subscribe(res => {
          Swal.fire({
            icon:res.success ? 'success' : 'error',
            title:res.success ? '¡Correcto!' : '¡Error!',
            text:res.msg,
            showConfirmButton:false,
            timer:2000
          }).then(() => {
            if(res.success) {
              this.router.navigateByUrl('distrital');
            }
          })
        })
      }
    })
  }

  reset(option:number) {
    if(option == 1) {
      this.myForm.patchValue({fecha_sesion:''});
    } else {
      this.myForm.patchValue({hora_sesion:''});
    }
  }
  // soloNumeros(event:any) {
  //   let charCode = event.charCode;

  //   if(charCode !== 8 && charCode !== 9) {
  //     let max = 1;

  //     if((charCode < 48 || charCode > 57 ||event.target.value.length >= max)) return false;
  //   }
  //   return;
  // }

  // bloquear(event:KeyboardEvent) {
  //   if(event.key === 'ArrowUp' || event.key === 'ArrowDown') {
  //     event.preventDefault();
  //   }
  // }
}
