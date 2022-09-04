<script lang="ts">
  import { fade } from "svelte/transition";

  import { candidato, relacionados } from "$lib/stores/dados";
  import TitleValue from "$lib/TitleValue.svelte";
  import ShareIcon from "$lib/assets/share.svg";
  import RedirectIcon from "$lib/assets/redirect.svg";
  import CargoEleicao from "$lib/CargoEleicao.svelte";
  import CardCandidato from "$lib/CardCandidato.svelte";
  import { capName, generateCard } from "$lib/generateCard";

  $: showCopyFeedback = false;
  $: cd = $candidato;
  $: cds = $relacionados.slice(0, 5);

  const onShare = () => {
    generateCard(cd).then((canvas) => {
      canvas.toBlob(function (blob) {
        const item = new ClipboardItem({ "image/png": blob || "" });
        navigator.clipboard.write([item]);

        showCopyFeedback = true;
        setTimeout(() => {
          showCopyFeedback = false;
        }, 1_500);
      });
    });
  };

  const gotoTSE = () => {
    window.open(
      `https://divulgacandcontas.tse.jus.br/divulga/#/candidato/2022/2040602022/PB/${$candidato.id}`,
      "_blank"
    );
  };
</script>

<svelte:head>
  <title>Nova Trilha - {capName(cd?.nomeUrna || "")}</title>
</svelte:head>

{#if $candidato}
  <section class="infos-container">
    <div class="candidato-card">
      <!-- <img src={cd.fotoUrl} alt="Foto do candidato" class="photo" /> -->
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
            value={cd.sites.length === 0 ? "Nenhum site cadastrado" : cd.sites}
          />
        </div>

        <div class="other-links">
          <div class="share-link clickable" on:click={onShare}>
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

    <div id="gc" />

    <div class="history">
      <h2>Histórico de candidaturas</h2>
      {#if cd.eleicoesAnteriores.length === 0}
        <span>Não possui histórico de candidaturas</span>
      {/if}
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

{#if showCopyFeedback}
  <div class="overlay" transition:fade={{ duration: 150 }}>
    <div class="pill">Perfil copiado. Envie para seus amigos.</div>
  </div>
{/if}

<style lang="scss">
  .infos-container {
    display: flex;
    flex-wrap: wrap;
    gap: max(0.5em, var(--font2));
    justify-content: space-between;
    padding: 1.25em var(--padding-details-page);
    margin-bottom: 5em;

    .candidato-card {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 2.75em;
      width: var(--mobile-width);
      min-width: 50vw;

      .photo {
        width: var(--big-photo, 11em);
        height: var(--big-photo, 11em);
        border-radius: 50%;
        border: 1px solid var(--gray);
        object-fit: cover;
      }

      .main-infos {
        display: flex;
        flex-direction: column;
        margin-right: auto;

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
          flex-wrap: wrap;
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
            font-size: var(--font0);

            img {
              width: 1.5em;
              height: 1.5em;
            }
          }
        }
      }
    }

    .candidato-card,
    .history {
      display: flex;
      margin-bottom: auto;
      padding: max(1.25em, 16px);
      border-radius: 11px;
      background-color: var(--lighter-gray);
    }

    h2 {
      margin: 0 0 0.125em;
      font-weight: 400;
      margin-bottom: 0.75em;
    }

    .history {
      flex-direction: column;
      width: var(--mobile-width);
      gap: max(0.675em, 10px);

      h2 {
        font-size: var(--font2);
        font-weight: 500;
      }
    }
  }

  .related {
    padding: 0 var(--padding-details-page);

    > h2 {
      font-size: 2.125em;
      font-size: var(--font3);
      margin-bottom: 1.5em;
      font-weight: 600;
    }

    .related-cards {
      display: flex;
      gap: 0.5em;
      overflow-y: hidden;
      overflow-x: auto;
    }
  }

  .overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0000004f;

    .pill {
      padding: 0.5em 1.5em;
      background-color: var(--purple);
      color: var(--white);
      border-radius: 20px;
    }
  }
</style>
