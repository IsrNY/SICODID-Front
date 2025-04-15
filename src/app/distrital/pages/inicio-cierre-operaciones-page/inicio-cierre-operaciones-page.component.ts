import { Component, inject, OnInit } from '@angular/core';
import { Catalogos } from '../../../shared/interfaces/catalogos.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inicio-cierre-operaciones-page',
  templateUrl: './inicio-cierre-operaciones-page.component.html',
  styleUrl: './inicio-cierre-operaciones-page.component.css'
})
export class InicioCierreOperacionesPageComponent implements OnInit {
  private fb = inject(FormBuilder);

  public myForm = this.fb.group({
    operaciones: this.fb.array([])
  })

  public gt:Catalogos[] = [];

  get operaciones():FormArray {
    return this.myForm.get('operaciones') as FormArray;
  }

  ngOnInit(): void {
    for(let i = 1; i < 4; i++) {
      this.gt.push({id:i.toString(), descripcion:i.toString()});
    }
  }

  addNewRegistroOperaciones() {
    this.operaciones.push(this.fb.group({
      fecha_hora_inicio:[''],
      fecha_hora_cierre:['']
    }))
  }

  removeRegistroOperaciones(index:number) {
    this.operaciones.removeAt(index);
  }
}
