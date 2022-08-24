import { page } from "$app/stores";
import { derived, readable } from "svelte/store";
import { dropdownFilterOptions } from "./dropdownFilter";
import { filters } from "./filters";

export const dados = readable([] as any, (set) => {
  fetch("/dados.json")
    .then((dados) => dados.json())
    .then((dados: Dados) => {
      set(dados);
    })
    .catch(console.log);
});

function withSearch(text: string) {
  if (!text) return () => true;
  text = text.toLowerCase();

  return (candidato: Candidato) => {
    return (
      `${candidato.numero}` === text ||
      candidato.nomeColigacao.toLowerCase().includes(text) ||
      candidato.nomeUrna.toLowerCase().includes(text)
    );
  };
}

const getActiveFilters = (options: FilterOption) =>
  options.values.filter((v) => v.checked).map((v) => v.label);
function withFilters(filters: FilterOption[]) {
  const filtersEtnia = getActiveFilters(filters[0]);
  const filterEtnia = (cd: Candidato) =>
    filtersEtnia.includes(cd.descricaoCorRaca);

  const filtersPartido = getActiveFilters(filters[1]);
  const filterPartido = (cd: Candidato) =>
    filtersPartido.includes(cd.partido.sigla);

  return (cd: Candidato) =>
    (filtersEtnia.length === 0 || filterEtnia(cd)) &&
    (filtersPartido.length === 0 || filterPartido(cd));
}

export const candidatos = derived([filters, dropdownFilterOptions, dados], ([$filters, $dropdownFilterOptions, $dados]) => {
  const { type, text } = $filters;
  if (!$dados || !$dados[type]) return [];

  const filtered = $dados[type].candidatos
    .filter(withFilters($dropdownFilterOptions))
    .filter(withSearch(text));

  return filtered;
});


export const candidato = derived([page, dados], ([$page, $dados]) => {
  const candidato = Object.values($dados)
    .map((cargo: any) => cargo.candidatos)
    .reduce((ac: Candidato[], it: Candidato) => ac.concat(it), [])
    .find((candidato: Candidato) => candidato.id === +$page.params.id);
  // if (!candidato) throw Error('Candidato não encontrado');

  return candidato as Candidato;
});
