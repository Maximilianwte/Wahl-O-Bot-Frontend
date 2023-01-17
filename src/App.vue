<template>
  <div
    class="
      min-h-screen
      w-screen
      flex-col
      relative
      theme_light
      text-main
      bg-bg
      pb-4
    "
  >
    <div
      id="beta-disclaimer"
      class="absolute top-0 left-0 mt-4 ml-2 text-2xl"
    ></div>
    <div
      class="
        header
        bg-bg
        flex
        absolute
        top-0
        right-0
        mt-4
        mr-4
        
        md:text-2xl
        font-black
        items-center
      "
    >
    <router-link class="mx-2 hover:text-focus" to="/"
        >Wahl-O-Bot</router-link
      >
      <router-link class="mx-2 hover:text-focus" to="/Methodik"
        >Methodik</router-link
      >
      <router-link
        class="
          mx-2
          hover:text-focus
          text-alternative text-center
          border-2
          rounded
          border-alternative
          px-4
          py-2
        "
        to="/Contribute"
        >Contribute</router-link
      >
    </div>
    <div
      class="
        logo logo
        flex
        absolute
        bottom-0
        right-0
        mb-16
        md:mb-6
        mr-6
        text-2xl
        font-black
        items-end
        hover:text-alternative
      "
    >
      <router-link
        class="
          mx-2
          hover:text-focus
          text-alternative text-center
          border-2
          rounded
          border-alternative
          text-lg
          md:text-2xl
          px-4
          py-2
        "
        to="/"
      >
        BETA</router-link
      >
      <a target="_blank" class="ml-4" href="https://www.bwl.uni-hamburg.de/ci.html">
        <img class="h-10 md:h-16" src="./assets/uhh.png" alt="Universität Hamburg" title="Universität Hamburg" />
      </a>
      <!-- <a target="_blank" class="ml-4" href="https://www.statistik.uni-muenchen.de/institut/index.html">
        <img class="h-10 md:h-16" src="./assets/LMU.png" alt="Ludwig-Maximilians-Universität München" title="Ludwig-Maximilians-Universität München" />
      </a> -->
    </div>
    <div id="footer" class="absolute bottom-0 right-0 mr-6 md:left-0 md:ml-8 mb-4 md:mb-4">
      <router-link to="/imprint">Impressum</router-link>
      <router-link class="ml-4" to="/privacy">Datenschutz</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  metaInfo: {
      title: 'Wahl-O-Bot | Der KI Wahlcheck',
      titleTemplate: '%s - Wahl-O-Bot | Der KI Wahlcheck',
      htmlAttrs: {
      lang: 'de'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'Der Wahl-O-Bot. Nutze die künstliche Intelligenz, um die Partei zu finden, die am ehesten deine Themen unterstützt. Benutze die App, um jeden möglichen Text einzugeben.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {name:'keywords', content:'Wahl, Wahlen, Wahl-o-Mat, Wahl-o-Bot, Bundestag, Deutschland, Politik, Parteien, Wahlhilfe, KI, AI'}
    ]
    },
  data() {
    return {};
  },
};
</script>

<style src="./main.css" />