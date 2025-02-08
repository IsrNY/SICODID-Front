import { Injectable } from '@angular/core';
import { Computo } from '../interfaces/computo.interface';

@Injectable({
  providedIn: 'root'
})
export class ComputoService {

  setComputo(computo:Computo, mode:string) {
    console.log(mode, computo);
  }
}
