import { Computo } from "../../distrital/interfaces/computo.interface";
import { Incidente } from "../../distrital/interfaces/incidentes.interface";

export interface Res {
  success:  boolean;
  msg?:string;
  token?: string;
  datos?: Computo | Incidente[];
  inicioComputo:boolean;
  cierreComputo:boolean;
}
