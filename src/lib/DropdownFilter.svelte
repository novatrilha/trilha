<script lang="ts">
  import { slide } from "svelte/transition";
  import FilterIcon from "$lib/assets/filter-icon.svg";
  import ChevronDownYellowIcon from "$lib/assets/chevron-down-yellow.svg";
  import CheckedIcon from "$lib/assets/checked.svg";
  import { dropdownFilterOptions } from "$lib/stores/dropdownFilter";

  $: open = false;
  $: openOption = "";
  $: {
    if (!open) {
      openOption = "";
    }
  }

  const toggleSuboption = (subOption: any) => {
    subOption.checked = !subOption.checked;
    dropdownFilterOptions.update((value) => [...value]);
  };
</script>

<svelte:window on:click={() => (open = false)} />

<div class="container">
  <button
    data-tertiary
    class="filters"
    on:click|stopPropagation={() => (open = !open)}
  >
    <img src={FilterIcon} alt="Ícone do botão de filtros" />
    filtros
  </button>
  {#if open}
    <div class="options-container" transition:slide={{ duration: 100 }}>
      {#each $dropdownFilterOptions as option}
        <div
          class="option clickable"
          on:click|stopPropagation={() =>
            (openOption = openOption === option.label ? "" : option.label)}
        >
          {option.label.toLowerCase()}
          <img src={ChevronDownYellowIcon} alt="Ícone de expandir opções" />
        </div>
        {#if openOption === option.label}
          <div
            class="suboptions-container"
            transition:slide={{ duration: 100 }}
          >
            {#each option.values as subOption (subOption.label)}
              <label class="suboption clickable" on:click|stopPropagation>
                {subOption.label.toLowerCase()}

                <input
                  type="checkbox"
                  checked={subOption.checked}
                  on:change={() => toggleSuboption(subOption)}
                />
                {#if subOption.checked}
                  <img src={CheckedIcon} alt="Caixa de seleção marcada" />
                {/if}
              </label>
            {/each}
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .container {
    position: relative;
    font-size: var(--mobile-font);

    button {
      height: 100%;
    }
  }

  .options-container {
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    min-width: 12em;
    background-color: var(--lighter-gray);
    border-radius: 2px;
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

  .option,
  .suboption {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 1.5em 1em;
    border-bottom: 1px solid var(--yellow);
    transition: 0.25s ease;
    text-transform: capitalize;
  }

  .option:hover {
    background-color: rgba(128, 128, 128, 0.2);
  }

  .options-container > .option:last-child {
    border-bottom: unset;
  }

  .suboptions-container {
    width: 100%;
    border-bottom: 1px solid var(--yellow);
  }

  .suboption {
    padding: .75em 1em;
    border: unset;
  }

  .suboption input {
    width: 18px;
    height: 18px;
    margin-left: auto;
    appearance: initial;
    border: 1px solid var(--yellow);
    border-radius: 4px;
  }

  .suboption img {
    margin-left: -24px;
  }
</style>
