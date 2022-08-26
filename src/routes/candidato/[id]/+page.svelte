<script lang="ts">
  import domtoimage from "dom-to-image";

  import { candidato, relacionados } from "$lib/stores/dados";
  import TitleValue from "$lib/TitleValue.svelte";
  import ShareIcon from "$lib/assets/share.svg";
  import RedirectIcon from "$lib/assets/redirect.svg";
  import CargoEleicao from "$lib/CargoEleicao.svelte";
  import CardCandidato from "$lib/CardCandidato.svelte";

  const onShare = () => {
    // const element = document.createElement("input") as HTMLInputElement;
    // element.value = $page.url.href;
    // element.select();
    // element.setSelectionRange(0, 99999);
    // navigator.clipboard.writeText(element.value);

    const node = document.querySelector(".candidato-card");
    domtoimage
      .toPng(node)
      .then(function (dataUrl: string) {
        // const img = new Image();
        // img.src = dataUrl;
        // node!.appendChild(img);

        fetch(dataUrl)
          .then((res) => res.blob())
          .then((blob) =>
            navigator.clipboard.write([
              new ClipboardItem({
                "image/png": blob,
              }),
            ])
          )
          .catch(console.error);
      })
      .catch(function (error: unknown) {
        console.error("oops, something went wrong!", error);
      });
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
            value={cd.sites[0] || "Nenhum site cadastrado"}
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

<style lang="scss">
  .infos-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    justify-content: space-between;
    padding: 1.25em 1.125em;
    margin-bottom: 5em;

    .candidato-card {
      width: var(--mobile-width);
      gap: 2.75em;
      flex-wrap: wrap;

      .photo {
        width: var(--big-photo, 11em);
        height: var(--big-photo, 11em);
        border-radius: 50%;
        border: 1px solid var(--gray);
        object-fit: cover;
        margin: 0 auto;
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
      padding: 1.25em 1.125em;
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
