<script lang="ts">
	import Card from "./Card.svelte";

	export let candidatos: Candidato[] = [];
</script>

<section>
	{#each candidatos as candidato (candidato.id)}
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
