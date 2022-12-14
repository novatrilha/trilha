// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface PrivateEnv {}
  // interface PublicEnv {}
}

declare module 'dom-to-image';

declare type HistoricoEleicao = {
  nrAno: number
  partido: string
  sgUe: string
  cargo: string
  situacaoTotalizacao: string
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

  eleicoesAnteriores: HistoricoEleicao[]
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