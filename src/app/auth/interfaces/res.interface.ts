import { Computo } from "../../distrital/interfaces/computo.interface";

export interface Res {
  success:  boolean;
  msg?:string;
  token?: string;
  datos?: Computo;
  inicioComputo:boolean;
  cierreComputo:boolean;
}
