<script lang="ts">
  import GlobeIcon from "$lib/assets/globe.svg";
  import InstaIcon from "$lib/assets/instagram.svg";
  import FaceIcon from "$lib/assets/facebook.svg";

  export let title = "";
  export let value: string | string[] = "";

  const getIcon = (v: string) => {
    const isInsta = v.includes("instagram.com");
    const isFace = v.includes("facebook.com");
    return isInsta ? InstaIcon : isFace ? FaceIcon : GlobeIcon;
  };

  const isLink = Array.isArray(value);
</script>

<div class="container">
  <small>{title}:</small>
  {#if isLink}
    <div class="links">
      {#each value as link}
        <a class="value link" href={link} target="_blank">
          <img src={getIcon(link)} alt="Ícone indicando site do candidato" />
        </a>
      {/each}
    </div>
  {:else}
    <span class="value">{value.toLowerCase()}</span>
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    gap: 5px;

    small {
      width: 100%;
    }
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
    max-width: 20ch;

    &:not(.link) {
      text-transform: capitalize;
    }

    &.link {
      display: inline-block;
      color: var(--yellow);

      img {
        width: max(1em, var(--font1));
        height: max(1em, var(--font1));
        margin-top: 0.125em;
      }
    }
  }

  .links {
    display: flex;
    gap: .375em;
  }
</style>
