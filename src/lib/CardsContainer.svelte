<script lang="ts">
	import Card from "./Card.svelte";
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
		gap: 1.5em;
		justify-items: center;
	}
</style>
