import { Component, inject, OnInit } from '@angular/core';
import { CatalogosService } from '../../../shared/services/catalogos.service';

@Component({
  selector: 'distrital-gestion-actas-jornada-page',
  templateUrl: './gestion-actas-jornada-page.component.html',
  styles: ``
})
export class GestionActasJornadaPageComponent implements OnInit {
  private catalogosService = inject(CatalogosService);

  // public
  ngOnInit(): void {
    
  }
}
