<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const types: LabelValue[] = [
		{
			label: 'dep. estadual',
			value: 'Deputado Estadual'
		},
		{
			label: 'dep. federal',
			value: 'Deputado Federal'
		}
	];

	$: typeSel = types[0];
	$: text = '';

	const dispatch = createEventDispatcher();
  let debounce: any = null;
	$: {
    clearTimeout(debounce)
    debounce = setTimeout(() => {
      dispatch('filter', {
        type: typeSel.value,
        text
      });
    }, 500);
	}

	const updateType = (type: LabelValue) => {
		typeSel = type;
	};
</script>

<div class="search-container">
	<div class="buttons-container">
		{#each types as type}
			<button data-secondary={type !== typeSel} on:click={() => updateType(type)}
				>{type.label}</button
			>
		{/each}
	</div>

	<input bind:value={text} class="search-input" placeholder="Buscar..." />

	<button data-tertiary>filtros</button>
</div>

<style>
	.search-container {
		display: flex;
		justify-content: space-between;
		gap: 5em;
	}

	.buttons-container {
		display: flex;
		gap: 1.25em;
	}

	.search-input {
		flex-grow: 1;
		color: var(--gray);
		border: 1px solid var(--gray);
		background: var(--white);
		border-radius: 6px;
		padding: 0.875em 1.25em 0.875em 2.25em;
		background-image: url('../assets/search.svg');
		background-repeat: no-repeat;
		background-size: 1.125em 1.125em;
		background-position: 0.75em 50%;
	}
</style>
