<script lang="ts">
  import GlobeIcon from "$lib/assets/globe.svg";
  import InstaIcon from "$lib/assets/instagram.svg";

  export let title = '';
  export let value = '';
  
  $: link = value.startsWith('https://')
  $: isInsta = value.includes('instagram.com')
</script>

<div class="container">
  <small>{title}:</small>
  {#if link}
    <a class="value link" href={value} target="_blank">
      <img src={isInsta ? InstaIcon : GlobeIcon} alt="Ícone indicando site do candidato" />      
    </a>
  {:else}
    <span class="value">{value.toLowerCase()}</span>
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
  }
  
  small {
    font-size: var(--font-3);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .value {
    font-size: var(--font2);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &:not(.link) {
      text-transform: capitalize;
    }

    &.link {
      color: var(--yellow);

      img {
        width: max(1em, var(--font1));
        height: max(1em, var(--font1));
        margin-top: .125em;
      }
    }
  }
</style>
