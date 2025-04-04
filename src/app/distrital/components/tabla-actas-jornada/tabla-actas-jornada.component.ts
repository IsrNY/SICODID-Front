import { Component, Input } from '@angular/core';
import { Catalogos } from '../../../shared/interfaces/catalogos.interface';

@Component({
  selector: 'distrital-tabla-actas-jornada',
  templateUrl: './tabla-actas-jornada.component.html',
  styleUrl: './tabla-actas-jornada.component.css'
})
export class TablaActasJornadaComponent {

  // @Input()
  // public datos:Catalogos[] | undefined;

  public datos:Catalogos[] = [
    {
      id: '1',
      descripcion:'Elemento 1'
    }
  ]

}
