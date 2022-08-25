<script lang="ts">
	import CardsContainer from "$lib/CardsContainer.svelte";
	import MainSlider from "$lib/MainSlider.svelte";
	import SearchBar from "$lib/SearchBar.svelte";

	const buildFilterOptions = (candidatos: any) => {
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

</script>

<svelte:head>
	<title>Nova Trilha</title>
</svelte:head>

<section>
	<MainSlider />

	<SearchBar />

	<CardsContainer />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 5em;
	}
</style>
