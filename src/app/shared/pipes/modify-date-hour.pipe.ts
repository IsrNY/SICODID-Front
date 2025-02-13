import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datehour'
})
export class ModifyDateHourPipe implements PipeTransform {

  transform(fecha:string): string {
    return fecha.replace('T',' ');
  }

}
