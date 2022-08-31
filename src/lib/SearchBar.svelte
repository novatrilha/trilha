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

	<div class="tabs">
		{#each filterOptions as type}
			<div
				class="tab"
				class:active={type.value === $filters.type}
				on:click={() => setType(type)}
			>
				{type.label}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.search-container {
		display: flex;
		max-width: max(70vw, 800px);
		flex-wrap: wrap;
		gap: 2em;
		margin: 0 auto;
	}

	.search-input {
		flex-grow: 1;
		margin-left: auto;
		font-size: var(--font-2);
		font-size: var(--font0);
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
		flex-wrap: wrap;
		gap: 0.5em;
		width: 100%;

		.title {
			font-size: var(--font2);
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
			font-size: var(--font1);
			text-transform: capitalize;
			background-color: var(--light-gray);
			border-radius: var(--font0);

			img {
				cursor: pointer;
			}
		}
	}

	.tabs {
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: var(--font0);

		.tab {
			flex-grow: 1;
			padding: 1em;
			color: var(--gray);
			border-bottom: 2px solid var(--gray);
			text-align: center;
			cursor: pointer;
			user-select: none;
			text-transform: uppercase;
			transition: .25s ease;

			&:hover {
				background-color: var(--lighter-gray);
			}
		}

		.tab.active {
			color: var(--red);
			border-color: var(--red);
		}
	}
</style>
