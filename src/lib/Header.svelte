<script lang="ts">
	import { page } from "$app/stores";
	import LogoIcon from "$lib/assets/logo.svg";

	const routes = [
		{ label: "Início", url: "/" },
		{ label: "Sobre", url: "/sobre" },
		// { label: "FAQ", url: "/faq" },
	];

	$: console.log($page)
</script>

<header>
	<a href="/">
		<img class="clickable" src={LogoIcon} alt="Logo da página, Trilha" />
	</a>

	<nav>
		{#each routes as route}
			<a
				class="clickable"
				href={route.url}
				class:active={`/${$page.routeId}` === route.url}
			>
				{route.label}
			</a>
		{/each}
	</nav>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
	}

	a > img {
		width: min(150px, 11em);
	}

	nav {
		display: flex;
		gap: 28px;
		font-weight: 600;
		font-size: max(1em, 16px);

		> a {
			display: block;
			color: var(--gray);
			text-decoration: none;

			&.active {
				color: var(--red);
			}
		}
	}
</style>
