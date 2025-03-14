import { Actas } from "../../distrital/interfaces/actas.interface";
import { Computo } from "../../distrital/interfaces/computo.interface";
import { Contador } from "../../distrital/interfaces/contador.interface";
import { Incidente } from "../../distrital/interfaces/incidentes.interface";
import { Integrantes } from "../../distrital/interfaces/integrantes.interface";
import { Casillas, Catalogos } from "../../shared/interfaces/catalogos.interface";

export interface Res {
  success:  boolean;
  msg?:string;
  token?: string;
  datos?: Computo | Incidente[] | Catalogos[] | Casillas[] | Actas | Contador | Integrantes[] | Integrantes;
  inicioComputo:boolean;
  cierreComputo:boolean;
}
