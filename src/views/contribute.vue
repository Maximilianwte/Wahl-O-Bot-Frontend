<template>
  <div
    id="contribute"
    class="text-3xl mt-48 mb-32 px-4 md:w-4/6 text-center flex-col"
  >
    <div class="text-2xl flex-col">
      <h4>
        Hast du Lust das Projekt zu unterstützen? Trage hier neue politische
        Statements ein, damit wir unser Modell verbessern können.
      </h4>
      <a
        class="
          mx-2
          hover:text-focus hover:border-focus
          text-alternative text-center
          border-2
          rounded
          border-alternative
          px-4
          py-2
          mt-12
        "
        href="https://unihamburgbs.eu.qualtrics.com/jfe/form/SV_5ua78L9zofQ2vwq"
        target="_blank"
      >
        Neue Aussagen hinzufügen</a
      >
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
      title: 'Unterstütze das Projekt',
      meta: [
      { name: 'description', content: 'Unterstütze das Wahl-O-Bot Projekt, indem du deine politischen Wünsche speicherst. Wir trainieren unser Modell dann auf diesen Themen weiter, um es noch schlauer zu machen.' },
      {name:'keywords', content:'Hilfe, Mitmachen, Unterstützen, Umfrage, Wahl, Wahlen, Wahl-o-Mat, Wahl-o-Bot, Bundestag, Deutschland, Politik, Parteien, Wahlhilfe, KI, AI'}
    ],
},
  data() {
    return {
      input: null,
      feedback: {
        makes_sense: null,
        feedback_text: null,
      },
    };
  },
  methods: {
    send_makes_sense(id) {
      this.feedback.makes_sense = id;
    },
    send_feedback() {
      this.feedback.feedback_text = this.input;
    },
  },
};
</script>

<style>
</style>