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
      border-gray-100
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
    <h2 class="mt-6 text-2xl font-bold text-center">
      Textstellen aus dem aktuellen Wahlprogramm der {{ getPartyTitle }}
    </h2>
    <ul class="mt-2">
      <li
        v-for="(text, index) in programData"
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
    <hr class="my-20 w-5/6" size="2" width="100%" color="#2d2d2d" />
    <img
      class="w-16"
      src="../assets/twitter.png"
      title="twitter"
      alt="twitter logo"
    />
    <h2 class="mt-6 text-2xl font-bold text-center">
      Aktuelle Tweets von Bundestagsabgeordneten der {{ getPartyTitle }}
    </h2>
    <ul class="mt-2 w-full">
      <li
        v-for="(tweet, index) in tweetData"
        :key="index"
        class="flex-col md:flex-row py-6 justify-center"
      >
        <img
          class="w-6 h-6 mt-1 mb-2 md:mb-0"
          src="../assets/twitter.png"
          title="twitter"
          alt="twitter logo"
        />
        <p class="ml-4 md:w-4/6">
          {{ tweet.name }} (<a
            :href="tweet.url"
            class="text-focus hover:text-alternative"
            target="_blank"
            >{{ tweet.handle }}</a
          >): {{ tweet.text }}
        </p>
      </li>
    </ul>
    <button
      class="
        rounded
        mt-6
        px-4
        py-2
        bg-alternative
        hover:bg-focus
        text-2xl text-bg
      "
    >
      Weitere anzeigen
    </button>
  </div>
</template>

<script>
export default {
  props: ["party"],
  data() {
    return {
      programData: [
        "Wir wollen Anreize schaffen, dass unsere hohen Standards, zum Beispiel beim Umwelt-, Verbraucher- und Arbeitnehmerschutz, international zum Standard werden. Denn unser Ziel ist multilateraler, fairer und regelbasierter Handel, der Wohlstandsperspektiven für alle eröffnet, den Kampf gegen den Klimawandel verstärkt, Kinderarbeit ächtet und auf eine Verbesserung der Arbeitsbedingungen in anderen Ländern hinwirkt (Seite 23, Regierungsprogramm 2021).",
        "Auf diese Prinzipien setzen wir auch im Kampf gegen den Klimawandel. Wir wollen jetzt, in die- 1067 sem Jahrzehnt, die entscheidenden Schritte gehen, damit Deutschland bis 2045 ein klimaneut- 1068 rales Industrieland wird (Seite 33, Regierungsprogramm 2021).",
        "Bund und Länder haben ein 1,5-Milliarden-Euro-Paket für die Wiederbewaldung, die An- passung der Wälder an den Klimawandel und für die Unterstützung der nachhaltigen Forstwirtschaft geschnürt (Seite 47, Regierungsprogramm 2021).",
      ],
      tweetData: [
        {
          name: "Dr. Christoph Ploss",
          handle: "@ChristophPloss",
          url: "https://twitter.com/christophploss/status/1557759191418380291",
          text: "In einer sozialen #Marktwirtschaft ist es nicht Aufgabe von Politikern, zu entscheiden, ob die #Klimaschutzziele am besten durch Elektroautos oder durch klimaneutrale Verbrenner erreicht werden. Als @cducsubt setzen wir daher auf Technologieoffenheit statt auf Planwirtschaft.",
        },
        {
          name: "Paul Zimiak",
          handle: "@PaulZimiak",
          url: "https://twitter.com/PaulZiemiak/status/1555912023644553217?cxt=HHwWgoC-8b3v2pcrAAAA",
          text: "😂 Habe sehr gelacht!",
        },
        {
          name: "Markus Söder",
          handle: "@Markus_Soeder",
          url: "https://twitter.com/Markus_Soeder/status/1558845652007899137?cxt=HHwWgsC-uZD3kKIrAAAA",
          text: "In schweren Zeiten brauchen wir Kraft und Lebensfreude. #Bayern ist stark. Wenn wir zusammenhalten, bleibt das auch so. Genießen Sie die Zeit!",
        },
      ],
    };
  },
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