// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface PrivateEnv {}
  // interface PublicEnv {}
}

declare interface Candidato {
  id: number
  nomeColigacao: string
  nomeUrna: string
  numero: number
  fotoUrl: string
  st_REELEICAO: boolean
  descricaoCorRaca: string
  descricaoSexo: string
  grauInstrucao: string
  ocupacao: string

  partido: {
    sigla: string
  }

  sites: string[]
}

declare type Dados = Record<string, {
  candidatos: Candidato[]
}>

declare type LabelValue = {
  label: string
  value: string
}

declare type FilterSubOpt = {
  label: string
  checked: boolean
}

declare type FilterOption = {
  label: string;
  values: FilterSubOpt[];
};