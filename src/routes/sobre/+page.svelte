<script lang="ts">
  import SearchIcon from "$lib/assets/search2.svg";
  import UserCheckIcon from "$lib/assets/user-check.svg";
  import CheckSquareIcon from "$lib/assets/check-square.svg";
  import MailIcon from "$lib/assets/mail.svg";

  const scrollToDisclaimer = () => {
    document
      .getElementById("disclaimer")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
</script>

<svelte:head>
  <title>Trilha - Sobre</title>
</svelte:head>

<section class="main-info">
  <span class="text">Descubra, escolha e vote!</span>
  <button class="purple-btn" on:click={scrollToDisclaimer}>
    VEJA COMO USAR A TRILHA
  </button>
</section>

<div class="container">
  <section class="about">
    <div class="item">
      <h3 class="title">O que é a trilha?</h3>
      <span class="description"
        >A Trilha é uma ferramenta de listagem e divulgação de candidaturas de
        partidos progressistas/de esquerda. A plataforma funciona para ajudar
        pessoas que procuram candidaturas desse espectro a terem acesso a uma
        listagem rápida.</span
      >
    </div>
    <div class="item">
      <h3 class="title">Pra quê serve a trilha?</h3>
      <span class="description"
        >A trilha serve como um filtro dos dados do TSE. Filtramos todas as
        candidaturas de partidos que se definem dentro de um amplo espectro de
        esquerda. Fizemos isso pra ajudar a divulgar candidaturas de esquerda,
        tirando delas a necessidade de aparecer em feeds que priorizam outros
        conteúdos que não são pautas da esquerda.</span
      >
    </div>
  </section>

  <section class="disclaimer" id="disclaimer">
    <h2>Fique alerta</h2>
    <span
      >Não é garantido que uma candidatura é alinhada com os ideais de esquerda
      só porque está em um partido que se diz de esquerda.</span
    >
  </section>

  <section class="more-info">
    <div class="item">
      <h2>
        <img src={SearchIcon} alt="Busque candidatos" />
        Descubra
      </h2>
      <span>
        A Trilha filtrou para você as candidaturas de partidos de um amplo
        espectro de esquerda na Paraíba.
      </span>

      <ul>
        <li>Use os filtros da Trilha.</li>
        <li>Visite o perfil das candidaturas na Trilha</li>
      </ul>
    </div>

    <div class="item">
      <h2>
        <img src={UserCheckIcon} alt="Escolha candidatos" />
        Escolha
      </h2>
      <span> Após analisar a listagem da Trilha, faça sua escolha. </span>

      <ul>
        <li>Veja o histórico de candidaturas e de partidos da(s) pessoa(s)</li>
        <li>Visite as redes sociais da(s) pessoa(s).</li>
        <li>
          Faça uma análise de como a(s) pessoa(s) se portaram sobre temas que
          são relevantes para você.
        </li>
        <li>Compartilhe o perfil da candidatura com seus amigos</li>
      </ul>
    </div>

    <div class="item">
      <h2>
        <img src={CheckSquareIcon} alt="Vote!" />
        Vote!
      </h2>
      <span>
        Precisamos atingir o Quoeficiente Partidário para elegermos nossos
        representantes.
      </span>

      <ul>
        <li>Prepare sua colinha para levar no dia 2 de Outubro</li>
      </ul>
    </div>
  </section>

  <section class="contact-us">
    <span class="text">
      Quer conversar com a gente? <br />
      Entre em contato
    </span>
    <span>
      <button class="purple-btn">
        <img src={MailIcon} alt="Ícone de email" />  
        ola.trilha@gmail.com
      </button>
    </span>
  </section>
</div>

<style lang="scss">
  .purple-btn {
    display: flex;
    align-items: center;
    gap: .25em;
    background-color: var(--purple);
    border-color: var(--purple);
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 8em;
    margin-top: 6em;
    padding: 0 var(--about-contents-padding);

    --desc-color: #1e1e1ede;
    span,
    li {
      color: var(--desc-color);
      font-size: var(--font0);
    }

    > *:not(.main-info) {
      flex-grow: 1;
    }

    h2 {
      margin: 0 0 0.5em 0;
      font-size: var(--font4);
    }
  }

  .main-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2em;
    flex-grow: 1;
    padding: 8em 0.5em;
    background: radial-gradient(
      104.49% 189.47% at 0% -3.38%,
      #ff912b 0%,
      #ff0000 45.3%,
      #4d00af 100%
    );

    .text {
      font-size: max(3vw, var(--font6));
      color: var(--white);
      font-weight: 500;
    }
  }

  .about {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4vw;

    .item {
      min-width: 250px;
      width: 55%;

      &:first-child {
        width: calc(45% - 4vw);
      }

      .title {
        font-size: var(--font5);
      }
    }
  }

  .disclaimer {
    border: 1px solid var(--orange);
    border-radius: 6px;
    padding: 1em min(3em, 4vw) 1.5em;
    font-size: var(--font0);

    > h2 {
      color: var(--orange);
    }
  }

  .more-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1em;

    .item {
      display: flex;
      flex-direction: column;
      width: 15%;
      padding: 1em 1.5em;
      margin-bottom: auto;
      border: 1px solid var(--dark-gray);
      border-radius: 6px;
      min-width: 250px;

      h2 {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      ul {
        display: flex;
        flex-direction: column;
        gap: 1em;
        margin-top: 3em;
        padding: 0;
      }

      li {
        display: block;
      }

      li::before {
        content: " ";
        display: block;
        background-image: url(/icons/arrow-right.svg);
        background-size: 100% 100%;
        height: 15px;
        width: 15px;
        margin-bottom: -3px;
        margin-right: 4px;
        display: inline-block;
      }
    }
  }

  .contact-us {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2em;
    max-width: 60ch;
    margin: 0 auto;

    .text {
      width: 12ch;
      font-size: var(--font5);
    }
  }
</style>
