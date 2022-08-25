<script lang="ts">
  export let title = '';
  export let value = '';
  
  
  $: link = value.startsWith('https://')
</script>

<div class="container">
  <small>{title}:</small>
  {#if link}
    <a class="value link" href={value} target="_blank">{value}</a>
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
    max-width: 16ch;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &:not(.link) {
      text-transform: capitalize;
    }

    &.link {
      color: var(--yellow);
    }
  }
</style>
