import { derived, writable } from "svelte/store";

export const dropdownFilterOptions = writable([
  {
    label: "Etnia",
    values: [
      { label: "BRANCA", checked: false },
      { label: "PRETA", checked: false },
      { label: "PARDA", checked: false },
      { label: "INDÍGENA", checked: false },
    ],
  },
  {
    label: "Partido",
    values: [
      { label: "PSB", checked: false },
      { label: "REDE", checked: false },
      { label: "PSOL", checked: false },
      { label: "PMN", checked: false },
      { label: "PT", checked: false },
      { label: "PC do B", checked: false },
      { label: "PV", checked: false },
      { label: "UP", checked: false },
    ],
  },
  {
    label: "Gênero",
    values: [
      { label: "MASC.", checked: false },
      { label: "FEM.", checked: false },
    ],
  },
] as FilterOption[]);

export const dropdownActiveFilters = derived(
  dropdownFilterOptions,
  $filters => $filters.map(option => option.values.filter(value => value.checked)).reduce((ac, it) => ac.concat(it), [])
);
