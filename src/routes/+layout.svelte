<script lang="ts">
  import Footer from "../lib/Footer.svelte"
  import Header from "../lib/Header.svelte"

  import '../app.scss'
</script>

<Header />

<main>
  <slot />
</main>

<Footer />
