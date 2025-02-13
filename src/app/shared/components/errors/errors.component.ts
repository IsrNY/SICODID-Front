import { Component, inject, Input } from '@angular/core';
import { ValidatorsService } from '../../services/validators.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-errors',
  template: `
    <div class="container-fluid p-0 m-0">
      <div class="row p-0 m-0">
        <div class="col-6 p-0 m-0 d-flex justify-content-start align-items-center">
          @if(isValidField() && (getFieldLengthErrors() == 'Campo obligatorio')) {
            <span class="text-danger">{{getFieldLengthErrors()}}</span>
          }
        </div>
        <div class="col-6 p-0 m-0 d-flex justify-content-end align-items-center">
          @if(getFieldLengthErrors() !== 'Campo obligatorio') {
            <span [class]="{'text-danger' : touched}">{{!getFieldLengthErrors().match('Cantidad mínima de caracteres:') ? getFieldLengthErrors() : getFieldLengthErrors()}}</span>
          } @else {
            <span>0/{{maxlength}}</span>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class ErrorsComponent {
  private validatorsService = inject(ValidatorsService);

  @Input()
  public maxlength:number = 0;

  @Input()
  public form?:FormGroup;

  @Input()
  public field:string = '';

  @Input()
  public touched:boolean = false;

  isValidField() {
    return this.validatorsService.isValidField(this.form!, this.field);
  }

  getFieldLengthErrors() {
    return this.validatorsService.getFieldLengthErrors(this.form!,this.field,this.maxlength);
  }

}
