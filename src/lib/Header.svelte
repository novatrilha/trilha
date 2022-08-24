<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import LogoIcon from "$lib/assets/logo.svg";

	const routes = [
		{ label: "Início", url: "" },
		{ label: "Sobre", url: "sobre" },
		{ label: "FAQ", url: "faq" },
	];
</script>

<header>
	<img
		class="clickable"
		on:click={() => goto("/")}
		src={LogoIcon}
		alt="Logo da página, Trilha"
	/>

	<nav>
		{#each routes as route}
			<a
				class="clickable"
				href={route.url}
				class:active={$page.routeId === route.url}
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

	img {
		width: min(150px, 11em);
	}

	nav {
		display: flex;
		gap: 28px;
		font-weight: 600;
		font-size: 1em;

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
