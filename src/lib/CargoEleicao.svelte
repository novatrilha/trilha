<script lang="ts">
  export let item: HistoricoEleicao;

  $: eleito = ['eleito', 'eleito por qp'].includes(item.situacaoTotalizacao.toLowerCase())
  $: naoEleito = item.situacaoTotalizacao.toLowerCase() === 'não eleito'
</script>

<div class="container">
  <div class="ano">{item.nrAno}</div>
  <div class="infos">
    <h3>{item.cargo}</h3>
    <span class="chip">{item.partido.toLowerCase()}</span>
    <span class="chip capt" class:eleito class:naoEleito>{item.situacaoTotalizacao.toLowerCase()}</span>
    <span class="chip">{item.sgUe}</span>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    align-items: center;
    gap: 1.5em;
    padding-bottom: max(.75em, 15px);
    border-bottom: 1px solid var(--light-gray);

    h3 {
      margin: 0 0 .5em;
      font-weight: 600;
      font-size: var(--font1);
    }
  }

  .ano {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.75em;
    height: 3.75em;
    font-size: var(--font0);
    border-radius: 50%;
    background-color: var(--red);
    color: var(--white);
  }

  .chip {
    font-size: var(--font-2);
    border-radius: 10px;
    padding: .125em .75em .25em;
    color: var(--dark-gray);
    border: 1px solid var(--dark-gray);
  }

  .chip:not(:last-child) {
    margin-right: max(.125em, 5px);
  }

  .eleito {
    color: var(--purple);
    border-color: var(--purple);
  }

  .naoEleito {
    color: var(--orange);
    border-color: var(--orange);
  }
</style>