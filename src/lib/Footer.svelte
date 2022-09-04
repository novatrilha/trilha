<script lang="ts">
	import LogoFooterIcon from "$lib/assets/logo-footer.svg";
	import LogoGithubIcon from "$lib/assets/logo-github.svg";
</script>

<footer>
	<img src={LogoFooterIcon} alt="Logo da página, Trilha" class="logo" />

	<section>
		<h2>Contato</h2>
		<p>ola.trilha@gmail.com</p>
	</section>

	<a
		href="https://github.com/novatrilha/trilha"
		target="_blank"
		class="github-redirect"
	>
		<img
			class="clickable"
			src={LogoGithubIcon}
			alt="Logo Github. Clique para ser redirecionado ao repositório do projeto"
		/>
	</a>
</footer>

<style lang="scss">
	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 3vw;
		color: var(--white);
		padding: min(166px, 7vw) min(100px, 5vw);
		background-color: var(--black);
	}

	section {
		font-size: var(--font0);

		h2 {
			margin: 0;
			font-weight: 400;
			font-size: var(--font2);
			line-height: 2.125em;
		}
	}

	.logo {
		width: min(200px, 15vw);
	}

	.github-redirect > img {
		width: clamp(30px, 7vw, 90px);
		height: clamp(30px, 7vw, 90px);
	}
</style>
