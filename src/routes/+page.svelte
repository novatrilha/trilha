<script lang="ts">
	import CardsContainer from "$lib/CardsContainer.svelte";
	import MainSlider from "$lib/MainSlider.svelte";
	import SearchBar from "$lib/SearchBar.svelte";

	$: dados = {} as Dados;
	$: candidatos = [] as Candidato[];

	fetch("/dados.json")
		.then((dados) => dados.json())
		.then((dadosApi: Dados) => {
			dados = dadosApi;
			candidatos = dados["Deputado Federal"].candidatos;
			console.log({ dados, candidatos });
		})
		.catch(console.log);

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

	function filter(event: any) {
		const { type, text } = event.detail;
		candidatos = dados[type].candidatos.filter(withSearch(text));
	}
</script>

<svelte:head>
	<title>Nova Trilha</title>
</svelte:head>

<section>
	<MainSlider />

	<SearchBar on:filter={filter} />

	<CardsContainer bind:candidatos />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 82px;
	}
</style>
