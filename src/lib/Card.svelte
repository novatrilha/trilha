<script lang="ts">
	import { fade } from "svelte/transition";

	export let candidato = {} as Candidato;
</script>

<div class="container" transition:fade={{ duration: 150 }}>
	<div class="image-container">
		<img src={candidato.fotoUrl} alt="Foto do candidato" />
		{#if candidato.st_REELEICAO}
			<div class="badge">Reeleição</div>
		{/if}
	</div>

	<span class="nome">{candidato.nomeUrna.toLowerCase()}</span>

	<div class="bloco">
		<span class="partido">{candidato.partido.sigla}</span>
		<span class="numero">{candidato.numero}</span>
	</div>

	<button>ir para o perfil</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.375em;
		width: calc(100% - 4.5em);
		max-width: 390px;
		padding: 1.5em;
		border: 1px solid var(--light-gray);
		border-radius: 10px;
	}

	img {
		position: relative;
		border: 1px solid var(--light-gray);
		border-radius: 50%;
		width: 90%;
		aspect-ratio: 1 / 1;
		object-fit: cover;
	}

	.image-container {
		position: relative;
		display: flex;
		justify-content: center;
	}

	.badge {
		position: absolute;
		bottom: 0.5rem;
		width: 100%;
		max-width: 15ch;
		border-radius: 1em;
		background-color: var(--yellow);
		color: var(--black);
		font-size: 0.75rem;
		text-align: center;
	}

	.nome {
		font-size: 1.5em;
		line-height: 1em;
		text-align: center;
		text-transform: capitalize;
	}

	.bloco {
		display: flex;
		justify-content: space-between;
		width: max(73%, 7em);
		margin-top: auto;
		font-size: 1.25em;
		font-weight: 500;
	}
</style>
