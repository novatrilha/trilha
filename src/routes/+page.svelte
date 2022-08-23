<script lang="ts">
	import CardsContainer from "$lib/CardsContainer.svelte";
	import MainSlider from "$lib/MainSlider.svelte";
	import SearchBar from "$lib/SearchBar.svelte";

	$: dados = {} as Dados;
	$: candidatos = [] as Candidato[];
	$: filters = { text: "", type: "" } as any;
	$: filterOptions = [
		{
			label: "Etnia",
			prop: "descricaoCorRaca",
			values: [
				{ label: "PARDA", checked: false },
				{ label: "BRANCA", checked: false },
				{ label: "PRETA", checked: false },
				{ label: "INDÍGENA", checked: false },
			],
		},
		{
			label: "Partido",
			prop: "partido.sigla",
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
	];

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
	function withFilters() {
		const filtersEtnia = getActiveFilters(filterOptions[0]);
		const filterEtnia = (cd: Candidato) =>
			filtersEtnia.includes(cd.descricaoCorRaca);

		const filtersPartido = getActiveFilters(filterOptions[1]);
		const filterPartido = (cd: Candidato) =>
			filtersPartido.includes(cd.partido.sigla);

		return (cd: Candidato) =>
			(filtersEtnia.length === 0 || filterEtnia(cd)) &&
			(filtersPartido.length === 0 || filterPartido(cd));
	}

	const buildFilterOptions = () => {
		const filtersMap = candidatos.reduce(
			(ac: any, it: Candidato) => {
				ac.sexo.add(it.descricaoSexo);
				ac.etnia.add(it.descricaoCorRaca);
				ac.partido.add(it.partido.sigla);
				return ac;
			},
			{
				sexo: new Set(),
				etnia: new Set(),
				partido: new Set(),
			}
		);

		const checked = false;
		const toFormat = (label: string) => ({ label, checked });
		return [
			{
				label: "Etnia",
				values: [...filtersMap.etnia].map(toFormat),
			},
			{
				label: "Partido",
				values: [...filtersMap.partido].map(toFormat),
			},
		];
	};

	$: {
		const { type, text } = filters;
		if (dados[type]) {
			candidatos = dados[type].candidatos
				.filter(withFilters())
				.filter(withSearch(text));
		} else if (0 > 0) {
			candidatos = Object.values(dados)
				.map((cg) => cg.candidatos)
				.reduce((a, i) => a.concat(i), [])
				.filter(withSearch(text));
			buildFilterOptions();
			console.log(filterOptions);
			console.log(JSON.stringify(filterOptions), null, 2);
		}
	}

	fetch("/dados.json")
		.then((dados) => dados.json())
		.then((dadosApi: Dados) => {
			dados = dadosApi;
		})
		.catch(console.log);

	function onFilter(event: any) {
		const { type, text, option, subOption } = event.detail;
		filters = { type, text, option, subOption };
		if (subOption) {
			filterOptions = [...filterOptions];
		}
	}
</script>

<svelte:head>
	<title>Nova Trilha</title>
</svelte:head>

<section>
	<MainSlider />

	<SearchBar on:filter={onFilter} bind:filterOptions />

	<CardsContainer bind:candidatos />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 82px;
	}
</style>
