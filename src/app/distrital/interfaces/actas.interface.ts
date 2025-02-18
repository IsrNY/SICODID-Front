export interface Actas {
  boletas_sobrantes:   string;
  cand_no_registrados: string;
  votos_nulos:         string;
  total_emitida:       string;
  candidatos:          Candidato[];
}

export interface Candidato {
  id_candidato:   string;
  nombre:         string;
  postula:        string;
  descripcion?:   string ;
  votos:          string;
}
