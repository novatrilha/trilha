<script lang="ts">
  import { candidato } from "$lib/stores/dados";

</script>

<svelte:head>
  <title>Nova Trilha - Candidato</title>
</svelte:head>

<div>
  {JSON.stringify($candidato)}
</div>
