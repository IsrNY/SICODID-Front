import { Component, inject, Injector, OnInit } from '@angular/core';
import { Catalogos } from '../../../shared/interfaces/catalogos.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Operaciones } from '../../interfaces/operiaciones.interface';
import { OperacionesService } from '../../services/operaciones.service';

@Component({
  selector: 'app-inicio-cierre-operaciones-page',
  templateUrl: './inicio-cierre-operaciones-page.component.html',
  styleUrl: './inicio-cierre-operaciones-page.component.css'
})
export class InicioCierreOperacionesPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private operacionesService = inject(OperacionesService);


  public myForm = this.fb.group({
    operaciones: this.fb.array([])
  })

  public gt:Catalogos[] = [];
  public lista_operaciones:Operaciones[] | undefined;
  public editing_values:boolean[] = [];

  get operaciones():FormArray {
    return this.myForm.get('operaciones') as FormArray;
  }

  ngOnInit(): void {
    for(let i = 1; i < 4; i++) {
      this.gt.push({id:i.toString(), descripcion:i.toString()});
    }
    this.getListaOperaciones()
  }

  addNewRegistroOperaciones() {
    this.operaciones.push(this.fb.group({
      id_actividad:[''],
      fecha_hora_inicio:['', [Validators.required]],
      fecha_hora_fin:['']
    }))
  }

  getListaOperaciones() {
    this.operacionesService.getListaOperaciones()
    .subscribe(res => {
      this.lista_operaciones = res.datos as Operaciones[];
      this.patchRegistroOperaciones(this.lista_operaciones);
      console.log(this.myForm.value)
      console.log(this.editing_values);
    })
  }

  patchRegistroOperaciones = (operaciones:Operaciones[]) => {
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

  removeRegistroOperaciones(index:number, id_actividad:number) {
    this.operaciones.removeAt(index);
  }
}
