export interface Catalogos {
  id:           string;
  descripcion:  string;
  tiene_votos?: number;
}

export interface Casillas {
  id_seccion:      string;
  tipo_casilla:    string;
  tipo_eleccion:   number;
  status?:         number;
  escaner?:        number;
}

