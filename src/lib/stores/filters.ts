import { writable } from "svelte/store";

export const filterOptions = [
  {
    label: "dep. estadual",
    value: "Deputado Estadual",
  },
  {
    label: "dep. federal",
    value: "Deputado Federal",
  },
] as LabelValue[];

export const filters = writable({ type: filterOptions[0].value, text: '' });