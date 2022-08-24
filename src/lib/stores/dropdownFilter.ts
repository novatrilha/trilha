import { derived, writable } from "svelte/store";

export const dropdownFilterOptions = writable([
  {
    label: "Etnia",
    values: [
      { label: "PARDA", checked: false },
      { label: "BRANCA", checked: false },
      { label: "PRETA", checked: false },
      { label: "INDÍGENA", checked: false },
    ],
  },
  {
    label: "Partido",
    values: [
      { label: "PSOL", checked: false },
      { label: "PSB", checked: false },
      { label: "PSTU", checked: false },
      { label: "CIDADANIA", checked: false },
      { label: "PT", checked: false },
      { label: "REDE", checked: false },
      { label: "PMN", checked: false },
      { label: "PV", checked: false },
    ],
  },
] as FilterOption[]);

export const dropdownActiveFilters = derived(
  dropdownFilterOptions,
  $filters => $filters.map(option => option.values.filter(value => value.checked)).reduce((ac, it) => ac.concat(it), [])
);
