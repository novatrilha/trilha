<script lang="ts">
	import Card from "./CardCandidato.svelte";
	import { candidatos } from "$lib/stores/dados";

	$: cds = $candidatos;
</script>

<section>
	{#each cds as candidato (candidato.id)}
		<Card bind:candidato />
	{/each}
</section>

<style>
	section {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		gap: min(1.5em, 2vw);
		justify-items: center;
	}
</style>
