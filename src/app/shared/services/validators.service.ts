import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public isValidField(form:FormGroup, field:string) {
    if(form.controls[field].errors && form.controls[field].touched) {
      return true;
    } else {
      return false;
    }
  }

  public getFieldErrors(form:FormGroup, field:string) {
    const errors = form.get(field)?.errors || {};

    for(const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Campo obligatorio';
        case 'minLength':
          return `El mínimo de carácteres requeridos es de: ${errors['minLength'].requiredLength}`;
        case 'maxLength':
          return `El máximo de carácteres requeridos es de: ${errors['maxLength'].requiredLength}`;
        case 'max':
          return `Valor máximo: ${errors['max'].max}`;
        case 'min':
          return `Valor mínimo: ${errors['min'].min}`;
      }
    }
    return '';
  }

  public getFieldLengthErrors(form:FormGroup, field:string, maxlength:number = 0) {
    const errors = form.controls[field].errors || {};

    for(const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Campo obligatorio';
        case 'maxlength':
          return `Límite de caracteres excedido: ${form.get(field)?.value.toString().length}/${maxlength}`;
        case 'minlength':
          return `Cantidad mínima de caracteres: ${form.get(field)?.value.toString().length}/${errors['minlength'].requiredLength}`;
      }
    }
    return `${form.get(field)?.value.toString().length}/${maxlength}`;
  }

  public isValidFieldVotos(form:FormGroup, field:string, position:string, form_field:string) {
    return form.get(field)?.get(position)?.get(form_field)?.errors && form.get(field)?.get(position)?.get(form_field)?.touched;
  }

  public getFieldErrorsVotos(form: FormGroup, field:string, position:string, form_field:string) {
    const errors = form.get(field)?.get(position)?.get(form_field)?.errors || {};

    for(const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Obligatorio';
      }
    }
    return null;
  }
}
