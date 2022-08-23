<script lang="ts">
	import CardsContainer from "$lib/CardsContainer.svelte";
	import MainSlider from "$lib/MainSlider.svelte";
	import SearchBar from "$lib/SearchBar.svelte";

	$: dados = {} as Dados;
	$: candidatos = [] as Candidato[];
	$: filters = { text: "", type: "" } as any;
	$: filterOptions = [] as FilterOption[];

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

	$: {
		const { type, text } = filters;
		if (dados[type]) {
			candidatos = dados[type].candidatos.filter(withSearch(text));
		}

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

		filterOptions = [
			{
				label: "Etnia",
				values: [...filtersMap.etnia],
			},
			{
				label: "Partido",
				values: [...filtersMap.partido],
			},
		];
	}

	fetch("/dados.json")
		.then((dados) => dados.json())
		.then((dadosApi: Dados) => (dados = dadosApi))
		.catch(console.log);

	function filter(event: any) {
		const { type, text } = event.detail;
		filters = { type, text };
	}
</script>

<svelte:head>
	<title>Nova Trilha</title>
</svelte:head>

<section>
	<MainSlider />

	<SearchBar on:filter={filter} bind:filterOptions />

	<CardsContainer bind:candidatos />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 82px;
	}
</style>
