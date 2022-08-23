<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import DropdownFilter from "./DropdownFilter.svelte";

	export let filterOptions: FilterOption[] = [];

	const types: LabelValue[] = [
		{
			label: "dep. estadual",
			value: "Deputado Estadual",
		},
		{
			label: "dep. federal",
			value: "Deputado Federal",
		},
	];

	$: typeSel = types[0];
	$: text = "";
	$: inputText = "";

	let debounce: any = null;
	$: {
		clearTimeout(debounce);
		debounce = setTimeout(() => {
			text = inputText;
		}, 500);
	}

	const dispatch = createEventDispatcher();
	$: {
		dispatch("filter", { text, type: typeSel.value });
	}

	onMount(() => dispatch("filter", { text, type: typeSel.value }));
</script>

<div class="search-container">
	<div class="buttons-container">
		{#each types as type}
			<button
				data-secondary={type !== typeSel}
				on:click={() => (typeSel = type)}>{type.label}</button
			>
		{/each}
	</div>

	<input bind:value={inputText} class="search-input" placeholder="Buscar..." />

	<DropdownFilter bind:filterOptions />
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
		background-image: url("../assets/search.svg");
		background-repeat: no-repeat;
		background-size: 1.125em 1.125em;
		background-position: 0.75em 50%;
	}
</style>
