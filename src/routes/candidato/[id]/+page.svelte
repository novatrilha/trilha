<script lang="ts">
  import { candidato } from "$lib/stores/dados";
  import TitleValue from "$lib/TitleValue.svelte";
  import ShareIcon from "$lib/assets/share.svg";
  import RedirectIcon from "$lib/assets/redirect.svg";
  import { page } from "$app/stores";

  const copyPageUrl = () => {
    const element = document.createElement("input") as HTMLInputElement;
    element.value = $page.url.href;
    element.select();
    element.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(element.value);
  };

  const gotoTSE = () => {
    window.open(
      `https://divulgacandcontas.tse.jus.br/divulga/#/candidato/2022/2040602022/PB/${$candidato.id}`,
      "_blank"
    );
  };

  $: console.log($candidato);
</script>

<svelte:head>
  <title>Nova Trilha - Candidato</title>
</svelte:head>

{#if $candidato}
  <section class="container">
    <img src={$candidato.fotoUrl} alt="Foto do candidato" class="photo" />
    <div class="main-infos">
      <h2 class="name">{$candidato.nomeUrna.toLowerCase()}</h2>
      <div class="sub-infos">
        <span>({$candidato.partido.sigla})</span>
        <span>{$candidato.numero}</span>
      </div>

      <div class="personal-infos-1">
        <TitleValue title="Gênero" value={$candidato.descricaoSexo} />
        <TitleValue title="Etnia" value={$candidato.descricaoCorRaca} />
        <TitleValue title="Ocupação" value={$candidato.ocupacao} />
      </div>
      <div class="personal-infos-2">
        <TitleValue
          title="Grau de escolaridade"
          value={$candidato.grauInstrucao}
        />
        <TitleValue
          title="Site"
          value={$candidato.sites[0] || "Nenhum site cadastrado"}
        />
      </div>

      <div class="other-links">
        <div class="share-link clickable" on:click={copyPageUrl}>
          <img src={ShareIcon} alt="Ícone compartilhar perfil" />
          Compartilhar perfil
        </div>

        <div class="goto-tse clickable" on:click={gotoTSE}>
          <img src={RedirectIcon} alt="Ícone acessar link do TSE" />
          Ir para o perfil no TSE
        </div>
      </div>
    </div>

    <div class="history">
      <h2>Histórico de candidaturas</h2>
    </div>
  </section>
{/if}

<style lang="scss">
  .container {
    display: flex;
    gap: 2.75em;
    padding: 1.25em 1.125em;
  }

  h2 {
    margin: 0 0 0.125em;
    font-weight: 600;
  }

  .photo {
    width: 11em;
    height: 11em;
    border-radius: 50%;
    border: 1px solid var(--gray);
    object-fit: cover;
  }

  .main-infos {
    display: flex;
    flex-direction: column;

    .name {
      font-size: 3em;
      text-transform: capitalize;
    }

    .sub-infos {
      display: flex;
      gap: 2em;
      font-size: 2.125em;
      margin-bottom: 2em;
    }

    .personal-infos-1 {
      margin-bottom: 2em;
    }

    .personal-infos-1,
    .personal-infos-2 {
      display: flex;
      gap: 2.675em;
    }

    .other-links {
      display: flex;
      gap: 3.5em;
      margin-top: 4em;

      .share-link,
      .goto-tse {
        display: flex;
        align-items: center;
        gap: 0.375em;

        img {
          width: 1.5em;
          height: 1.5em;
        }
      }
    }
  }

  .history {
    margin-left: auto;
  }
</style>
