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

{#if cds.length === 0}
	<div class="no-results">Nenhuma candidatura encontrada</div>
{/if}

<style>
	section {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		gap: min(1.5em, 2vw);
		justify-items: center;
	}

	.no-results {
		padding: 1em 0;
		text-align: center;
		font-size: var(--font2);
	}
</style>
