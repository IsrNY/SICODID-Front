import { Component, inject, Input} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


declare var $:any;

@Component({
  selector: 'distrital-actas',
  templateUrl: './actas.component.html',
  styleUrl: './actas.component.css'
})
export class ActasComponent{
  private fb = inject(FormBuilder);

  public myForm = this.fb.group({
    boletas_sobrantes: ['',[Validators.required]],
    cand_no_registrados: ['',[Validators.required]],
    votos_nulos: ['',[Validators.required]],
    total_emitida: ['',[Validators.required]],
    candidatos: this.fb.array([]),
  })

  @Input()
  public tipo_eleccion:string = '';

  @Input()
  public seccion:number = 0;

  @Input()
  public casilla:string = '';

  closeModal() {
    $('#actas').modal('hide')
  }

}
