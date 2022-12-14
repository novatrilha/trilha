import { page } from "$app/stores";
import { derived, readable } from "svelte/store";
import { dropdownFilterOptions } from "./dropdownFilter";
import { filters } from "./filters";

const replace = (coll: unknown[], i1: number, i2: number) => {
  const temp = coll[i1]
  coll[i1] = coll[i2]
  coll[i2] = temp
}

export const dados = readable({} as Dados, (set) => {
  fetch("/dados.json")
    .then((dados) => dados.json())
    .then((dados: Dados) => {
      Object.values(dados).forEach((cargo) => {
        cargo.candidatos.forEach((cd) => {
          const format = cd.fotoUrl.split('.').reverse()[0];
          cd.fotoUrl = `/photos/${cd.id}.${format}`;
        })

        cargo.candidatos.forEach((_, i) => {
          const otherI = Math.floor(Math.random() * cargo.candidatos.length);
          replace(cargo.candidatos, i, otherI);
        })
      })
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

  const filtersGenero = getActiveFilters(filters[2]);
  const filterGenero = (cd: Candidato) =>
    filtersGenero.includes(cd.descricaoSexo);

  return (cd: Candidato) =>
    (filtersEtnia.length === 0 || filterEtnia(cd)) &&
    (filtersGenero.length === 0 || filterGenero(cd)) &&
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

const getCds = (dados: Dados) => Object.values(dados)
  .map((cargo: any) => cargo.candidatos)
  .reduce((ac: Candidato[], it: Candidato) => ac.concat(it), []);

export const candidato = derived([page, dados], ([$page, $dados]) => {
  const candidato = getCds($dados).find((candidato: Candidato) => candidato.id === +$page.params.id);
  // if (!candidato) throw Error('Candidato n??o encontrado');

  return candidato as Candidato;
});

export const relacionados = derived([candidato, dados], ([$candidato, $dados]) => {
  if (!$candidato) return []
  return getCds($dados).filter((cd: Candidato) => cd.partido.sigla === $candidato.partido.sigla && cd.id !== $candidato.id);
});
