<script lang="ts">
	export let candidato = {} as Candidato;
</script>

<div class="container">

  <div class="image-container">
    <img src={candidato.fotoUrl} alt="Foto do candidato" />
    {#if candidato.st_REELEICAO}
    <div class="badge">Reeleição</div>
    {/if}
  </div>

	<div class="infos">
		<div class="primeiro-bloco">
			<span class="nome">{candidato.nomeUrna}</span>
			<span class="numero">{candidato.numero}</span>
		</div>

		<span class="partido">{candidato.partido.sigla}</span>
	</div>

	<button>ir para o perfil</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2.75em;
		width: 16em;
		padding: 1.5em;
		border: 1px solid var(--light-gray);
		border-radius: 10px;
	}

	img {
    position: relative;
		border: 1px solid var(--light-gray);
		border-radius: 50%;
		min-width: 9em;
		min-height: 9em;
		max-width: 9em;
		max-height: 9em;
		object-fit: cover;
	}

  .image-container {
    position: relative;
  }

  .badge {
    position: absolute;
    left: calc(50% - 4ch - 22px);
    bottom: 10px;
    padding: 0 25px;
    border-radius: 16px;
    background-color: var(--yellow);
    color: var(--black);
    font-size: .75rem;
  }

	.infos {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.primeiro-bloco {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.nome {
		font-size: 2em;
		line-height: 1em;
	}

	.numero {
		font-size: 1em;
	}

	.partido {
		font-size: 0.675em;
		text-align: end;
	}

	button {
		margin-top: auto;
	}
</style>
