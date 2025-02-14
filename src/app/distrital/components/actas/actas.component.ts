import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ValidatorsService } from '../../../shared/services/validators.service';

declare var $:any;

@Component({
  selector: 'distrital-actas',
  templateUrl: './actas.component.html',
  styleUrl: './actas.component.css'
})
export class ActasComponent{

  closeModal() {
    $('#actas').modal('hide')
  }

}
