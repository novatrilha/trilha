<script lang="ts">
	import Card from './Card.svelte';
	export let candidatos: Candidato[] = [];
</script>

<section>
	{#each candidatos as candidato}
		<Card bind:candidato />
	{/each}
</section>

<style>
	section {
		display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 2.5em;
	}
</style>
