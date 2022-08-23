<script lang="ts">
  import FilterIcon from "../assets/filter-icon.svg";
  import ChevronDownYellowIcon from "../assets/chevron-down-yellow.svg";

  export let filterOptions: FilterOption[] = [];

  $: open = false;
  $: openSubOption = "";

  $: {
    if (!open) {
      openSubOption = "";
    }
  }
</script>

<div class="container">
  <button data-tertiary class="filters">
    <img src={FilterIcon} alt="Ícone do botão de filtros" />
    filtros
  </button>
  {#if open}
    <div class="options-container">
      {#each filterOptions as option}
        <div
          class="option clickable"
          on:click={() =>
            (openSubOption =
              openSubOption === option.label ? "" : option.label)}
        >
          {option.label}
          <img src={ChevronDownYellowIcon} alt="Ícone de expandir opções" />
        </div>
        {#if openSubOption === option.label}
          <div class="suboptions-container">
            {#each option.values as subOption}
              <div class="option">{subOption}</div>
            {/each}
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .container {
    position: relative;
  }

  .options-container {
    position: absolute;
    top: 100%;
    min-width: 12em;
    background-color: var(--white);
    z-index: 1;
    filter: drop-shadow(0px 24px 38px rgba(0, 0, 0, 0.14))
      drop-shadow(0px 9px 46px rgba(0, 0, 0, 0.12))
      drop-shadow(0px 11px 15px rgba(0, 0, 0, 0.2));
  }

  .filters {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 22px 16px;
    border-bottom: 1px solid var(--yellow);
  }
  
  .options-container > .option:last-child {
    border-bottom: unset;
  }

  .suboptions-container {
    width: 100%;
  }
</style>
