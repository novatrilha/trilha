<script lang="ts">
	import LogoFooterIcon from '../assets/logo-footer.svg';
	import LogoGithubIcon from '../assets/logo-github.svg';
</script>

<footer>
	<img src={LogoFooterIcon} alt="Logo da página, Trilha" class="logo"/>

	<section>
		<h2>Sobre</h2>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis, egestas dictum enim,
			cursus tristique. Eget mi egestas dolor tincidunt lacus lacus leo amet imperdiet. Quis in
			pharetra ullamcorper quisque consectetur ut velit natoque. Vitae nibh sagittis senectus
			aliquet bibendum pulvinar ac, tortor, non. Sed blandit massa arcu scelerisque donec augue ut.
			Diam, pharetra, nibh aenean laoreet ornare.
		</p>
	</section>

	<img
		class="clickable"
		src={LogoGithubIcon}
		alt="Logo Github. Clique para ser redirecionado ao repositório do projeto"
	/>
</footer>

<style>
	footer {
		display: flex;
		justify-content: space-between;
		color: var(--white);
		padding: min(166px, 10em) min(100px, 7em);
		background-color: var(--black);
	}

	section {
		width: 55em;
	}

	section h2 {
		margin: 0;
		font-weight: 400;
		font-size: 2em;
		line-height: 2.125em;
	}

  .logo {
    width: min(200px, 20em)
  }
</style>
