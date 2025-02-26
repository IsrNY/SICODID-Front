export interface Catalogos {
  id:           string;
  descripcion:  string;
}

export interface Casillas {
  id_seccion:      string;
  tipo_casilla:    string;
  tipo_eleccion:   number;
  status?:         number;
}

