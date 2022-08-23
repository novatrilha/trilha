<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import LogoIcon from "../assets/logo.svg";

	const routes = [
		{ label: "Início", url: "" },
		{ label: "Sobre", url: "sobre" },
		{ label: "FAQ", url: "faq" },
		{ label: "Contato", url: "contato" },
	];

	$: console.log($page);
</script>

<header>
	<img
		class="clickable"
		on:click={() => goto("/")}
		src={LogoIcon}
		alt="Logo da página, Trilha"
	/>

	<ul>
		{#each routes as route}
			<li class="clickable" class:active={$page.routeId === route.url}>
				{route.label}
			</li>
		{/each}
	</ul>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	img {
		width: min(150px, 11em);
	}

	ul {
		display: flex;
		gap: 28px;
		font-weight: 600;
		font-size: 1em;
	}

	ul > li {
		display: block;
		color: var(--gray);
	}

	li.active {
		color: var(--red);
	}
</style>
