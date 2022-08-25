<script lang="ts">
  import { candidato, relacionados } from "$lib/stores/dados";
  import TitleValue from "$lib/TitleValue.svelte";
  import ShareIcon from "$lib/assets/share.svg";
  import RedirectIcon from "$lib/assets/redirect.svg";
  import { page } from "$app/stores";
  import CargoEleicao from "$lib/CargoEleicao.svelte";
  import CardCandidato from "$lib/CardCandidato.svelte";

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
  $: cd = $candidato;
  $: cds = $relacionados.slice(0, 5);
</script>

<svelte:head>
  <title>Nova Trilha - Candidato</title>
</svelte:head>

{#if $candidato}
  <section class="infos-container">
    <div class="candidato-card">
      <img src={cd.fotoUrl} alt="Foto do candidato" class="photo" />
      <div class="main-infos">
        <h2 class="name">{cd.nomeUrna.toLowerCase()}</h2>
        <div class="sub-infos">
          <span>({cd.partido.sigla})</span>
          <span>{cd.numero}</span>
        </div>

        <div class="personal-infos-1">
          <TitleValue title="Gênero" value={cd.descricaoSexo} />
          <TitleValue title="Etnia" value={cd.descricaoCorRaca} />
          <TitleValue title="Ocupação" value={cd.ocupacao} />
        </div>
        <div class="personal-infos-2">
          <TitleValue title="Grau de escolaridade" value={cd.grauInstrucao} />
          <TitleValue
            title="Site"
            value={cd.sites[0] || "Nenhum site cadastrado"}
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
    </div>

    <div class="history">
      <h2>Histórico de candidaturas</h2>
      {#each cd.eleicoesAnteriores as item (item.nrAno)}
        <CargoEleicao bind:item />
      {/each}
    </div>
  </section>

  {#if cds.length > 0}
    <section class="related">
      <h2>Candidatos relacionados</h2>

      <div class="related-cards">
        {#each cds as candidato}
          <CardCandidato bind:candidato />
        {/each}
      </div>
    </section>
  {/if}
{/if}

<style lang="scss">
  .infos-container {
    display: flex;
    flex-wrap: wrap;
    gap: .5em;
    justify-content: space-between;
    padding: 1.25em 1.125em;
    margin-bottom: 5em;

    .candidato-card {
      gap: 2.75em;
    }

    .candidato-card,
    .history {
      display: flex;
      margin-bottom: auto;
      padding: 1.25em 1.125em;
      border-radius: 11px;
      background-color: var(--lighter-gray);
    }

    h2 {
      margin: 0 0 0.125em;
      font-weight: 400;
      margin-bottom: 0.75em;
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
        margin-bottom: 0;
      }

      .sub-infos {
        display: flex;
        gap: 2em;
        font-size: 2.125em;
        margin-bottom: 1.25em;
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
      display: flex;
      flex-direction: column;
      gap: 0.675em;

      h2 {
        font-size: 2em;
        font-weight: 500;
      }
    }
  }

  .related {
    padding: 0 3em;

    > h2 {
      font-size: 2.125em;
      margin-bottom: 1.5em;
      font-weight: 600;
    }

    .related-cards {
      display: flex;
      gap: 0.5em;
      overflow-y: scroll;
    }
  }
</style>
