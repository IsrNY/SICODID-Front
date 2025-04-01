import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedMethodsService {
  private dataSource = new BehaviorSubject<boolean>(false);
  public data$ = this.dataSource.asObservable();

  setData(value:boolean):void {
    this.dataSource.next(value);
  }
}
