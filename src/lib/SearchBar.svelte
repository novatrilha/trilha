<script lang="ts">
	import DropdownFilter from "$lib/DropdownFilter.svelte";
	import {
		dropdownActiveFilters,
		dropdownFilterOptions,
	} from "$lib/stores/dropdownFilter";
	import { filters, filterOptions } from "$lib/stores/filters";
	import { fade } from "svelte/transition";
	import CloseIcon from "$lib/assets/close.svg";

	let debounce: any = null;
	$: inputText = "";
	$: {
		clearTimeout(debounce);
		debounce = setTimeout(() => {
			filters.update((state) => ({ ...state, text: inputText }));
		}, 500);
	}

	const removeFilter = (filter: FilterSubOpt) => {
		filter.checked = false;
		dropdownFilterOptions.update((state) => [...state]);
	};

	const setType = (type: LabelValue) => {
		filters.update((state) => ({ ...state, type: type.value }));
	};
</script>

<div class="search-container">
	<div class="buttons-container">
		{#each filterOptions as type}
			<button
				data-secondary={type.value !== $filters.type}
				on:click={() => setType(type)}>{type.label}</button
			>
		{/each}
	</div>

	<input bind:value={inputText} class="search-input" placeholder="Buscar..." />

	<DropdownFilter />

	<div class="active-filters">
		<span class="title" class:empty={$dropdownActiveFilters.length === 0}
			>Filtros aplicados:</span
		>
		{#each $dropdownActiveFilters as filter (filter.label)}
			<span class="filter" transition:fade={{ duration: 150 }}>
				{filter.label.toLowerCase()}
				<img
					src={CloseIcon}
					alt="Remover filtro"
					on:click={() => removeFilter(filter)}
				/>
			</span>
		{/each}
	</div>
</div>

<style lang="scss">
	.search-container {
		display: flex;
		flex-wrap: wrap;
		gap: 2em;
	}

	.buttons-container {
		display: flex;
		gap: 1.25em;
	}

	.search-input {
		flex-grow: 1;
		max-width: 700px;
		margin-left: auto;
		font-size: 0.75em;
		color: var(--gray);
		border: 1px solid var(--gray);
		background: var(--white);
		border-radius: 6px;
		padding: 0.875em 1.25em 0.875em 2.25em;
		background-image: url("$lib/assets/search.svg");
		background-repeat: no-repeat;
		background-size: 1.125em 1.125em;
		background-position: 0.75em 50%;
	}

	.active-filters {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		width: 100%;

		.title {
			font-size: 1.25em;
			font-weight: 500;
		}

		.empty {
			color: transparent;
		}

		.filter {
			display: flex;
			align-items: center;
			gap: 0.25em;
			padding: 0.25em 0.675em;
			font-size: 0.875em;
			text-transform: capitalize;

			img {
				cursor: pointer;
			}
		}
	}
</style>
