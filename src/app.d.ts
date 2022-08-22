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
  nomeColigacao: string
  nomeUrna: string
  numero: number
  fotoUrl: string
  st_REELEICAO: boolean
}

declare type Dados = Record<string, {
  candidatos: Candidato[]
}>

declare type LabelValue = {
  label: string
  value: string
}
