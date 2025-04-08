// export interface Actas {
//   boletas_sobrantes:   string;
//   cand_no_registrados: string;
//   votos_nulos:         string;
//   total_emitida:       string;
//   candidatos:          Candidato[];
// }

// export interface Candidato {
//   id_candidato:   string;
//   nombre:         string;
//   postula:        string;
//   descripcion?:   string ;
//   votos:          string;
// }

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
  status: number;
}

