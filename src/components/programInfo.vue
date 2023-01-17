<template>
  <div
    class="
      infoField
      absolute
      top-0
      md:relative
      flex-col
      text-justify text-xl
      md:mt-4
      bg-bg
      border-2
      rounded
      shadow-md
      pb-20
      border-gray-500
      md:border-gray-100
      w-full
      pr-4
      md:px-0
    "
  >
    <button
      @click="$emit('sendClose')"
      class="absolute svg-gray text-2xl top-0 md:right-0 mt-2 md:mr-6"
      title="Informationen schließen"
    >
      <svg
        class="w-12 rotate-180"
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
          <path
            d="M352 3837 l-352 -352 1280 -1280 1280 -1280 1280 1280 1280 1280
-352 352 -353 353 -927 -927 -928 -928 -928 928 -927 927 -353 -353z"
          />
        </g>
      </svg>
    </button>
    <img
      class="w-48 mt-10"
      :src="resolve_img_url"
      :title="party"
      :alt="party"
    /> 
    <!-- <img
      class="w-16"
      src="../assets/twitter.png"
      title="twitter"
      alt="twitter logo"
    /> -->
    <h2 v-if="data.tweets.length > 0" class="mt-6 text-2xl font-bold text-center">
      Aktuelle Tweets von Bundestagsabgeordneten der {{ getPartyTitle }}
    </h2>
    <h2 v-else class="mt-6 text-2xl font-bold text-center">
      Keine aktuellen Tweets zu dieser Aussage vorhanden.
    </h2>
    <ul class="mt-2 w-full">
      <li
        v-for="(tweet, index) in data.tweets"
        :key="index"
        class="flex-col md:flex-row py-6 justify-center"
      >
        <a :href="tweet.url"
            target="_blank">
          <img
          class="w-6 h-6 mt-1 mb-2 md:mb-0"
          src="../assets/twitter.png"
          title="Link zum Tweet"
          alt="Link zum Tweet"
        />
        </a>
        <p class="ml-4 md:w-4/6">
          {{ tweet.name }} (<a
            :href="tweet.url"
            class="text-focus hover:text-alternative"
            target="_blank"
            >{{ tweet.user }}</a
          >): {{ tweet.text }}
        </p>
      </li>
    </ul>
    <hr class="my-20 w-5/6" size="2" width="100%" color="#2d2d2d" />
    <h2 v-if="data.wahlprogramm.length > 0" class="text-2xl font-bold text-center">
      Textstellen aus dem 2021 Wahlprogramm der {{ getPartyTitle }}
    </h2>
    <h2 v-else class="text-2xl font-bold text-center">
      Keine Textstellen aus dem 2021 Wahlprogramm der {{ getPartyTitle }} gefunden.
    </h2>
    <ul class="mt-2">
      <li
        v-for="(text, index) in data.wahlprogramm"
        :key="index"
        class="flex-col md:flex-row py-6 justify-center"
      >
        <div
          class="
            index
            rounded-full
            border-2
            h-8
            w-8
            mt-1
            flex-col
            border-main
            mb-2
            md:mb-0
          "
        >
          {{ index + 1 }}
        </div>
        <p class="ml-4 md:w-4/6">
          {{ text }}
        </p>
      </li>
    </ul>
    <button
      @click="$emit('sendClose')"
      class="text-xl mt-10 border-2 rounded-lg border-focus text-focus px-2 py-2 md:hidden"
      title="Informationen schließen"
    >
    Information schließen
    </button>
  </div>
</template>

<script>
export default {
  props: ["party", "data"],
  computed: {
    resolve_img_url() {
      let images = require.context("../assets/", false, /\.png$|\.jpg$/);
      return images("./" + this.party + ".png");
    },
    getPartyTitle() {
      switch (this.party) {
        case "cdu": {
          return "CDU/CSU Fraktion";
        }
        case "spd": {
          return "SPD";
        }
        case "fdp": {
          return "FDP";
        }
        case "grüne": {
          return "Grünen";
        }
        case "linke": {
          return "Linke Fraktion";
        }
        case "afd": {
          return "AfD";
        }
      }
      return null;
    },
  },
  methods: {
    getImage() {
      return "../assets/cdu.png";
    },
  },
  mounted() {
    if (window.innerWidth < 640) {
      window.scrollTo(0, 0);
    }
  },
};
</script>