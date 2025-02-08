import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ComputoService } from '../../services/computo.service';
import { Computo } from '../../interfaces/computo.interface';
import { AuthService } from '../../../auth/services/auth.service';

declare var $:any;

@Component({
  selector: 'distrital-computo',
  templateUrl: './computo.component.html',
  styleUrl: './computo.component.css'
})
export class ComputoComponent implements OnInit {
  private location = inject(Location);
  private fb = inject(FormBuilder);
  private computoService = inject(ComputoService);
  private authService = inject(AuthService);

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

  ngOnInit(): void {
    if(this.location.path().match('inicio_computo')) {
      this.computo = 'inicio';
    } else {
      this.computo = 'cierre';
    }
  }

  enviar() {
    this.computoService.setComputo(this.myForm.value as Computo, this.computo)
  }

  soloNumeros(event:any) {
    let charCode = event.charCode;

    if(charCode !== 8 && charCode !== 9) {
      let max = 2;

      if((charCode < 48 || charCode > 57 ||event.target.value.length >= max)) return false;
    }
    return;
  }

  bloquear(event:KeyboardEvent) {
    if(event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }
  }
}
