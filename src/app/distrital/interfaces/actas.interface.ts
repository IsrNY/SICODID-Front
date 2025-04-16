export interface Actas {
  votos_nulos:         string;
  total_votos:         string;
  recuedros_nu?:       string;
  candidatos:          Datos[];
}

export interface Candidato {
  M: Datos[];
  H: Datos[];
}

export interface Datos {
  id_candidato: number;
  nombre:       string;
  postula:      string;
  tipo_materia:  string;
  votos:        number;
  genero:       string;
}

export interface DatosActa {
  id_seccion: string;
  tipo_casilla: string;
  operacion: number;
  tipo_eleccion: number;
}

export interface ActaJornada {
  id_seccion:               string;
  tipo_casilla:             string;
  personas_votaron:         string;
  votos_tribunal:           string;
  votos_magistraturas:      string;
  votos_juzgados:           string;
  punto_escrutinio:         string;
}

