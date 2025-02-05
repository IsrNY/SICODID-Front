import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public isValidField(form:FormGroup, field:string) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getFieldErrors(form:FormGroup, field:string) {
    const errors = form.get(field)?.errors || {};

    for(const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Campo obligatorio';
        case 'minlength':
          return `El mínimo de carácteres requeridos es de: ${errors['minLength'].requiredLength}`;
        case 'maxlength':
          return `El máximo de carácteres requeridos es de: ${errors['maxLength'].requiredLength}`;
        case 'max':
          return `Valor máximo: ${errors['max'].max}`;
        case 'min':
          return `Valor mínimo: ${errors['min'].min}`;
      }
    }
    return null;
  }

}
