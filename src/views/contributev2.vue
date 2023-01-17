<template>
  <div id="contribute" class="flex-col mb-64 px-2 lg:px-24 w-full">
    <div class="white absolute h-20 w-full bg-bg top-0"></div>
    <div id="input" class="mt-20 md:mt-32 text-2xl">
      <div class="input flex-col px-4">
        <h3 class="text-main w-full px-6 md:w-5/6 text-justify">
          Der <b>Wahl-O-Bot</b>. Schreib, was immer du
          <b>politisch wünschst</b>. Dein Anliegen, in deinen Worten. Wir haben
          eine politische KI trainiert und können dir sagen, welche Partei dein
          Anliegen in der Tendenz am ehesten vertritt.
        </h3>
        <h3 class="text-main mt-4 w-full px-6 md:w-5/6 text-justify">
          <b>Versuche einige unterschiedliche Eingaben in unserem Wahl-o-bot</b
          >. Nachdem du 3 Eingaben gemacht hast, kannst du zur Umfrage in
          Qualtrics zurückkehren.
        </h3>
        <div class="mt-20" ref="toScrollRef" id="scrollto" />
        <h4 v-if="nEntries < 3" class="text-center text-3xl">
          Gib noch <span class="text-focus">{{ 3 - nEntries }}</span> weitere
          Aussagen ein.
        </h4>
        <div
          v-else
          id="forwardQualtrics"
          class="
            flex-col
            mt-20
            mb-12
            text-focus text-center text-2xl
            hrefcolors
          "
        >
          <p>
            Vielen Dank. Sie können dieses Tab nun schließen und zur Umfrage in
            Qualtrics zurückkehren.
          </p>
          <!-- <a
            class="text-alternative hover:text-focus"
            :href="getQualtricsHREF"
            >Zu Qualtrics</a
          > -->
        </div>
        <div
          v-if="nEntries < 3"
          class="input mt-10 px-6 flex-col w-full lg:flex-row"
        >
          <div id="input_text" class="relative w-full md:w-96 tooltip">
            <input
              type="text"
              @keyup.enter="calculate"
              v-model="statement"
              :placeholder="example"
              maxlength="100"
              class="
                px-2
                py-2
                w-full
                shadow-md
                border-gray-200 border
                md:border-0
                rounded-lg
              "
            />
            <button
              @click="deleteInput"
              v-if="statement.length > 0"
              class="
                delete-button
                text-base
                py-2
                px-2
                flex-col
                absolute
                top-0
                mt-2
                right-0
                mr-2
                h-8
                w-8
                pt-1
                bg-gray-300
                text-white
                rounded-full
              "
            >
              x
            </button>
          </div>
          <button
            @click="calculate"
            class="
              rounded-lg
              shadow-md
              text-white
              px-6
              py-2
              mt-4
              bg-alternative
              hover:bg-focus
              lg:mt-0 lg:ml-4
            "
          >
            Berechnen
          </button>
        </div>
        <p class="text-alternative mt-6 px-4 text-center text-lg">
          {{ information }}
        </p>
        <div class="hot flex-col mt-4">
          <h3 class="">Aktuelle Top Themen unserer User</h3>
          <div class="topics row-1 mt-4 flex text-xl">
            <button
              @click="lockExample(0)"
              @mouseenter="hoverExample = 0"
              @mouseleave="hoverExample = null"
              class="
                px-2
                py-2
                rounded-lg
                mx-2
                hover:text-bg hover:bg-alternative
                bg-gray-100
                text-gray-400
              "
            >
              Ukrainekrieg
            </button>
            <button
              @click="lockExample(1)"
              @mouseenter="hoverExample = 1"
              @mouseleave="hoverExample = null"
              class="
                px-2
                py-2
                rounded-lg
                mx-2
                bg-gray-100
                text-gray-400
                hover:text-bg hover:bg-alternative
              "
            >
              Inflation
            </button>
            <button
              @click="lockExample(2)"
              @mouseenter="hoverExample = 2"
              @mouseleave="hoverExample = null"
              class="
                px-2
                py-2
                rounded-lg
                mx-2
                bg-gray-100
                text-gray-400
                hover:text-bg hover:bg-alternative
              "
            >
              Klimawandel
            </button>
            <button
              @click="lockExample(3)"
              @mouseenter="hoverExample = 3"
              @mouseleave="hoverExample = null"
              class="
                px-2
                py-2
                rounded-lg
                mx-2
                bg-gray-100
                text-gray-400
                hover:text-bg hover:bg-alternative
                hidden
                md:block
              "
            >
              Mietpreise
            </button>
          </div>
          <div class="topics row-2 mt-2 flex text-xl">
            <button
              @click="lockExample(4)"
              @mouseenter="hoverExample = 4"
              @mouseleave="hoverExample = null"
              class="
                px-2
                py-2
                rounded-lg
                mx-2
                hover:text-bg hover:bg-alternative
                bg-gray-100
                text-gray-400
              "
            >
              Bafög
            </button>
            <button
              @click="lockExample(5)"
              @mouseenter="hoverExample = 5"
              @mouseleave="hoverExample = null"
              class="
                px-2
                py-2
                rounded-lg
                mx-2
                hover:text-bg hover:bg-alternative
                bg-gray-100
                text-gray-400
              "
            >
              Atomkraft
            </button>
            <button
              @click="lockExample(6)"
              @mouseenter="hoverExample = 6"
              @mouseleave="hoverExample = null"
              class="
                px-2
                py-2
                rounded-lg
                mx-2
                hover:text-bg hover:bg-alternative
                bg-gray-100
                text-gray-400
              "
            >
              Maskenpflicht
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="loading" v-if="loading" class="loader-wrapper mt-2 text-xl">
      <p>Das Modell berechnet aktuell ihre Ergebnisse.</p>
      <div class="loader mt-6">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div id="after_calculation" v-show="calculated" class="flex-col mx-4 hide">
      <div id="output_text" class="positioner flex-col">
        <div class="mt-6 w-full md:px-12 text-center text-2xl">
          Wahrscheinlichkeit, der <b>tendenziellen Übereinstimmung</b> der
          Parteien gemäß unserer Berechnungen:
        </div>
        <div id="output" class="grid-container md:mt-6 text-2xl">
          <div
            class="party mt-4 grid-3 items-center justify-center flex-col mx-2"
          >
            <img
              class="w-48"
              src="../assets/cdu.png"
              title="CDU/CSU"
              alt="CDU/CSU"
            />
            <h5>{{ data.cdu }} %</h5>
            <div class="moreInfo mt-4 text-base">
              <button
                @click="send_request_more_information('cdu')"
                :class="[get_moreInformation_button_color('cdu'), getNotAllowed]"
                :disabled="loadingMoreInformation"
                title="Zeige Textstellen aus dem Wahlprogramm und Tweets"
                class="
                  rounded-full
                  border-2
                  h-8
                  w-8
                  flex-col
                  border-main
                  hover:border-alternative hover:text-alternative
                  bg-bg
                "
              >
                i
              </button>
            </div>
          </div>
          <div
            class="party mt-4 grid-3 items-center justify-center flex-col mx-2"
          >
            <img class="w-48" src="../assets/spd.png" title="SPD" alt="SPD" />
            <h5>{{ data.spd }} %</h5>
            <div class="moreInfo mt-4 text-base">
              <button
                @click="
                  send_request_more_information('spd')
                "
                :class="[get_moreInformation_button_color('spd'), getNotAllowed]"
                :disabled="loadingMoreInformation"
                title="Zeige Textstellen aus dem Wahlprogramm und Tweets"
                class="
                  rounded-full
                  border-2
                  h-8
                  w-8
                  flex-col
                  border-main
                  hover:border-alternative hover:text-alternative
                  bg-bg
                "
              >
                i
              </button>
            </div>
          </div>
          <div
            class="party mt-4 grid-3 items-center justify-center flex-col mx-2"
          >
            <img class="w-48" src="../assets/fdp.png" title="FDP" alt="FDP" />
            <h5>{{ data.fdp }} %</h5>
            <div class="moreInfo mt-4 text-base">
              <button
                @click="
                  send_request_more_information('fdp')
                "
                :class="[get_moreInformation_button_color('fdp'), getNotAllowed]"
                :disabled="loadingMoreInformation"
                title="Zeige Textstellen aus dem Wahlprogramm und Tweets"
                class="
                  rounded-full
                  border-2
                  h-8
                  w-8
                  flex-col
                  border-main
                  hover:border-alternative hover:text-alternative
                  bg-bg
                "
              >
                i
              </button>
            </div>
          </div>
          <div
            class="party mt-4 grid-3 items-center justify-center flex-col mx-2"
          >
            <img
              class="w-48"
              src="../assets/grüne.png"
              title="Grüne"
              alt="Grüne"
            />
            <h5>{{ data.grüne }} %</h5>
            <div class="moreInfo mt-4 text-base">
              <button
                @click="
                  send_request_more_information('grüne')
                "
                :class="[get_moreInformation_button_color('grüne'), getNotAllowed]"
                :disabled="loadingMoreInformation"
                title="Zeige Textstellen aus dem Wahlprogramm und Tweets"
                class="
                  rounded-full
                  border-2
                  h-8
                  w-8
                  flex-col
                  border-main
                  hover:border-alternative hover:text-alternative
                  bg-bg
                "
              >
                i
              </button>
            </div>
          </div>
          <div
            class="party mt-4 grid-3 items-center justify-center flex-col mx-2"
          >
            <img
              class="w-48"
              src="../assets/linke.png"
              title="Die Linke"
              alt="Die Linke"
            />
            <h5>{{ data.linke }} %</h5>
            <div class="moreInfo mt-4 text-base">
              <button
                @click="
                  send_request_more_information('linke')
                "
                :class="[get_moreInformation_button_color('linke'), getNotAllowed]"
                :disabled="loadingMoreInformation"
                title="Zeige Textstellen aus dem Wahlprogramm und Tweets"
                class="
                  rounded-full
                  border-2
                  h-8
                  w-8
                  flex-col
                  border-main
                  hover:border-alternative hover:text-alternative
                  bg-bg
                "
              >
                i
              </button>
            </div>
          </div>
          <div
            class="party mt-4 grid-3 mx-2 items-center justify-center flex-col"
          >
            <img class="w-48" src="../assets/afd.png" title="AfD" alt="AfD" />
            <h5>{{ data.afd }} %</h5>
            <div class="moreInfo mt-4 text-base">
              <button
                @click="
                 send_request_more_information('afd')
                "
                :class="[get_moreInformation_button_color('afd'), getNotAllowed]"
                :disabled="loadingMoreInformation"
                title="Zeige Textstellen aus dem Wahlprogramm und Tweets"
                class="
                  rounded-full
                  border-2
                  h-8
                  w-8
                  flex-col
                  border-main
                  hover:border-alternative hover:text-alternative
                  bg-bg
                "
              >
                i
              </button>
            </div>
          </div>
        </div>
        <ProgramInfo
          @sendClose="moreInformation = false"
          v-if="moreInformation != false && loadingMoreInformation == false"
          :party="moreInformation"
          :data="moreInformation_data"
        />
        <div
          id="loading"
          v-if="loadingMoreInformation"
          class="loader-wrapper text-xl mt-4 flex-col
      text-justify text-xl
      mt-4
      bg-bg
      border-2
      rounded
      shadow-md
      w-full
      pb-12
      border-gray-100"
        >
          <h3 class="mt-12 text-xl">Das Modell analysiert Textstellen aus den Wahlprogrammen und aktuelle Tweets</h3>
          <div class="loader mt-8">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div
        id="feedback"
        class="text-2xl w-full mx-12 md:w-128 text-center mt-12"
      >
        <div id="make_sense" class="flex-col text-center text-2xl">
          <h2>Wirken die berechneten Ergebnisse für dich richtig?</h2>
          <div
            id="answers"
            class="flex mt-6 cursor-pointer justify-around text-5xl"
          >
            <div
              id="yes"
              alt="Die Berechnung ist korrekt"
              title="Die Berechnung ist korrekt"
              @click="start_useful_feedback(true)"
              class="mx-4"
            >
              👍
            </div>
            <div
              id="no"
              alt="Die Berechnung ist falsch"
              title="Die Berechnung ist falsch"
              @click="start_useful_feedback(false)"
              class="mx-4"
            >
              👎
            </div>
          </div>
          <h6 v-if="useful_feedback == false" class="mt-6 mb-4 italic">
            "{{ statement }}"
          </h6>
          <h5 v-if="useful_feedback == false">
            Welche Partei stimmt dieser Aussage deiner Meinung nach
            <b><em>wirklich</em></b> zu / nicht zu?
          </h5>
          <div
            v-if="useful_feedback == false"
            id="feedback images"
            class="grid-container text-2xl"
          >
            <div id="cdu" class="grid-2 flex-col">
              <img
                class="w-48 mx-1 cursor-pointer flex-col"
                :class="get_colored('cdu')"
                @click="toggle_feedback('cdu')"
                src="../assets/cdu.png"
                alt="CDU/CSU"
                title="CDU/CSU"
              />
              <h5 class="text-base">{{ feedback_party.cdu }}</h5>
            </div>
            <div id="spd" class="grid-2 flex-col">
              <img
                class="w-48 grid-2 mx-1 cursor-pointer flex-col"
                :class="get_colored('spd')"
                @click="toggle_feedback('spd')"
                src="../assets/spd.png"
                alt="SPD"
                title="SPD"
              />
              <h5 class="text-base">{{ feedback_party.spd }}</h5>
            </div>
            <div id="fdp" class="grid-2 flex-col">
              <img
                class="w-48 grid-2 mx-1 cursor-pointer flex-col"
                :class="get_colored('fdp')"
                @click="toggle_feedback('fdp')"
                src="../assets/fdp.png"
                alt="FDP"
                title="FDP"
              />
              <h5 class="text-base">{{ feedback_party.fdp }}</h5>
            </div>
            <div id="grüne" class="grid-2 flex-col">
              <img
                class="w-48 grid-2 mx-1 cursor-pointer flex-col"
                :class="get_colored('grüne')"
                @click="toggle_feedback('grüne')"
                src="../assets/grüne.png"
                alt="Grüne"
                title="Grüne"
              />
              <h5 class="text-base">{{ feedback_party.grüne }}</h5>
            </div>
            <div id="linke" class="grid-2 flex-col">
              <img
                class="w-48 grid-2 mx-1 cursor-pointer flex-col"
                :class="get_colored('linke')"
                @click="toggle_feedback('linke')"
                src="../assets/linke.png"
                alt="Die Linke"
                title="Die Linke"
              />
              <h5 class="text-base">{{ feedback_party.linke }}</h5>
            </div>
            <div id="afd" class="grid-2 flex-col">
              <img
                class="w-48 grid-2 mx-1 cursor-pointer flex-col"
                :class="get_colored('afd')"
                @click="toggle_feedback('afd')"
                src="../assets/afd.png"
                alt="AfD"
                title="AfD"
              />
              <h5 class="text-base">{{ feedback_party.afd }}</h5>
            </div>
          </div>
          <button
            v-if="useful_feedback == false"
            @click="send_useful_feedback"
            class="
              rounded-lg
              bg-alternative
              shadow-md
              hover:bg-focus
              text-white
              px-6
              py-2
              mt-6
              lg:mt-6 lg:ml-4
            "
          >
            Bestätigen
          </button>
          <h5
            class="text-2xl mt-6 text-alternative"
            v-if="feedback_useful_send"
          >
            Vielen Dank für dein Feedback!
          </h5>
        </div>
        <div id="disclaimer" class="mt-48 px-10">
          <hr class="my-10" size="2" width="100%" color="#2d2d2d" />
          <p class="text-lg text-justify text-lighter">
            Disclaimer: Zur Berechnung des Ergebnisses verwenden wir
            state-of-the-art KI-Sprachmodelle. Die Prognose beruht auf komplexen
            Korrelationen und spiegelt nicht zwingend die tatsächliche
            Parteiposition wider.
          </p>
          <p class="mt-2 text-lg text-justify text-lighter">
            DAS MODELL BEFINDET SICH AKTUELL IN DER TESTPHASE (BETA). Eingaben,
            die keine politischen Aussagen enthalten können deshalb zu falschen
            Ergebnissen führen. Außerdem ist die Anzahl der verfügbaren Parteien
            noch auf 6 begrenzt. Wir versuchen schnellstmöglich weitere Parteien
            zu unterstützen. Deine Eingaben werden anonymisiert gesammelt und
            können zu Forschungszwecken weiterverwendet werden.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backend_functions from "../data/backend_functions";
import ProgramInfo from "../components/programInfo.vue"
export default {
  components: { ProgramInfo },
  metaInfo: {
    title: "Unterstütze das Projekt",
    meta: [
      {
        name: "description",
        content:
          "Unterstütze das Wahl-O-Bot Projekt, indem du deine politischen Wünsche speicherst. Wir trainieren unser Modell dann auf diesen Themen weiter, um es noch schlauer zu machen.",
      },
      {
        name: "keywords",
        content:
          "Hilfe, Mitmachen, Unterstützen, Umfrage, Wahl, Wahlen, Wahl-o-Mat, Wahl-o-Bot, Bundestag, Deutschland, Politik, Parteien, Wahlhilfe, KI, AI",
      },
    ],
  },
  watch: {
    calculated: function () {
      if (this.calculated == true) {
        this.$nextTick(function () {
          var element = this.$refs["toScrollRef"];
          var top = element.offsetTop;
          window.scrollTo(0, top);
        });
      }
    },
  },
  data() {
    return {
      userIP: null,
      nEntries: 0,
      statement: "",
      information: null,
      loading: false,
      calculated: false,
      useful_feedback: null,
      feedback_useful_send: false,
      feedback_text: null,
      feedback_text_send: false,
      data: {
        cdu: null,
        spd: null,
        grüne: null,
        fdp: null,
        linke: null,
        afd: null,
      },
      feedback_party: {
        cdu: null,
        spd: null,
        grüne: null,
        fdp: null,
        linke: null,
        afd: null,
      },
      examples: [
        "Gegen Waffenexporte in die Ukraine",
        "Die Inflation muss gestoppt werden",
        "Kein Neubau von Kohlekraftwerken",
        "Mietpreise in Wohnungen sollen gedeckelt werden",
        "Das Bafög soll unabhängig vom Einkommen der Eltern erhätlich sein",
        "Deutsche Atomkraftwerke sollen in keinem Fall wieder ans Netz genommen werden",
        "Die Maskenpflicht in öffentlichen Verkehrsmitteln abschaffen",
        "Ich bin für eine geringere Erbschaftssteuer",
        "Mehr Zusammenarbeit in Europa",
        "Für ein Recht auf unbefristete Arbeitsverträge",
        "Für ein Tempolimit auf Autobahnen",
        "Für mehr veganes Essen in Mensen",
        "Die Currywurst soll auch in Zukunft in der Katine erhältlich sein",
      ],
      moreInformation: false,
      loadingMoreInformation: false,
      moreInformation_data: null,
      moreInformation_reqID: null,
      hoverExample: null,
    };
  },
  computed: {
    example() {
      if (this.hoverExample == null) {
        return this.examples[parseInt(Math.random() * this.examples.length)];
      } else {
        return this.examples[this.hoverExample];
      }
    },
    getColor() {
      return this.calculated
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-alternative hover:bg-focus cursor-pointer";
    },
    getNotAllowed() {
      return this.loadingMoreInformation ? "cursor-not-allowed text-gray-300 border-gray-300 hover:text-gray-300 hover:border-gray-300" : "";
    },
    getQualtricsHREF() {
      if (this.$route.query.p != null) {
        return (
          "https://unihamburgbs.eu.qualtrics.com/jfe/form/SV_cPh9ViJvGJlWJ6u?p=" +
          this.$route.query.p +
          "&m=" +
          this.$route.query.m
        );
      } else {
        return "https://unihamburgbs.eu.qualtrics.com/jfe/form/SV_cPh9ViJvGJlWJ6u";
      }
    },
  },
  methods: {
    geturlparameter(id) {
      return this.$route.query[id] == null ? "" : this.$route.query[id];
    },
    lockExample(id) {
      this.statement = this.examples[id];
      this.calculated = false;
      this.loading = false;
    },
    get_moreInformation_button_color(id) {
      return this.moreInformation == id
        ? "border-alternative text-alternative"
        : null;
    },
    send_request_more_information(id) {
      this.loadingMoreInformation = true;
      this.moreInformation = this.moreInformation == id ? false : id;
      this.moreInformation_reqID = String(parseInt(Math.random() * 1e9));
      var data = {
        reqID: this.moreInformation_reqID,
        party: id,
        statement: this.statement.toLowerCase(),
      };
      backend_functions.send_request_more_information(data).then(response => {
        this.moreInformation_data = JSON.parse(response.data.data);
        this.loadingMoreInformation = false;
        if (response.status == 500) {
          setTimeout (() => this.triggerCollect_request_more_information(), 3000);
        }
      });
    },
    async triggerCollect_request_more_information() {
      if (this.moreInformation_reqID != null) {
        var fulfilled = await this.collect_request_more_information();
        if (fulfilled == false) {
          setTimeout(
            () => this.triggerCollect_request_more_information(),
            3000
          );
        } else {
          this.moreInformation_reqID = null;
        }
      }
    },
    collect_request_more_information() {
      return new Promise((resolve) => {
        backend_functions
          .collect_request_more_information({
            reqID: this.moreInformation_reqID,
          })
          .then((response) => {
            if (response.status == 200) {
              this.moreInformation_data = JSON.parse(response.data.data);
              this.loadingMoreInformation = false;
              resolve(true);
            } else {
              resolve(false);
            }
          });
      });
    },
    calculate() {
      this.loading = true;
      this.calculated = false;
      this.information = "";
      this.reset_feedback();
      this.feedback_useful_send = false;
      this.feedback_text_send = false;
      this.statement = this.statement.replaceAll('"', "");
      this.statement = this.statement.replaceAll("'", "");
      this.statement = this.statement.replaceAll(".", "");
      this.statement = this.statement.replaceAll("?", "");
      this.statement = this.statement.replaceAll("!", "");
      this.statement = this.statement.replaceAll("@", "");
      this.statement = this.statement.replaceAll("_", "");
      if (this.statement.length > 4) {
        backend_functions.get_allowance().then((response) => {
          if (response.status == "200") {
            backend_functions
              .send_statement({
                statement: this.statement.toLowerCase(),
              })
              .then((response) => {
                if (response.status == 201) {
                  console.log(response);
                  this.information =
                    "Das Modell wird nach einer längeren Ruhezeit neu gestartet. Bitte versuchen Sie die Eingabe in 20-30 Sekunden noch einmal.";
                  this.loading = false;
                } else if (response.status == 200) {
                  this.data = {
                    cdu: Math.round(response.data["cdu/csu"] * 100, 2),
                    spd: Math.round(response.data["spd"] * 100, 2),
                    grüne: Math.round(response.data["grüne"] * 100, 2),
                    fdp: Math.round(response.data["fdp"] * 100, 2),
                    linke: Math.round(response.data["die linke"] * 100, 2),
                    afd: Math.round(response.data["afd"] * 100, 2),
                  };
                  this.information = null;
                  this.loading = false;
                  this.calculated = true;
                  this.nEntries++;
                  //this.scrollTo = true;
                  backend_functions.send_statement_db({
                    statement: this.statement,
                    ip: this.userIP,
                  });
                } else {
                  this.calculated = false;
                  this.loading = false;
                  this.information =
                    "Ein Fehler ist in unserem Modell aufgetreten. Bitte probiere es in einigen Sekunden erneut.";
                }
              });
          } else {
            this.information =
              "Das Modell befindet sich aktuell in Wartungsarbeiten. Bitte versuchen Sie es in einiger Zeit erneut.";
            this.calculated = false;
            this.loading = false;
          }
        });
      } else {
        this.information = "Bitte gib eine politische Aussage ein.";
        this.calculated = false;
        this.loading = false;
      }
    },
    start_useful_feedback(id) {
      this.useful_feedback = id;
      var parties = ["cdu", "spd", "fdp", "grüne", "linke", "afd"];
      for (var i in parties) {
        if (this.data[parties[i]] >= 50) {
          this.feedback_party[parties[i]] = "Ja";
        } else {
          this.feedback_party[parties[i]] = "Nein";
        }
      }
      if (this.useful_feedback == true) {
        this.send_useful_feedback(true);
      }
    },
    toggle_feedback(id) {
      this.feedback_party[id] = this.feedback_party[id] == "Ja" ? "Nein" : "Ja";
    },
    get_colored(id) {
      return this.feedback_party[id] == "Nein" ? "grayscale" : "";
    },
    send_useful_feedback(id) {
      var parties = ["cdu", "spd", "fdp", "grüne", "linke", "afd"];
      var data = {
        statement: this.statement.toLowerCase(),
        correctPredicted: this.useful_feedback,
        ip: this.userIP,
        p: this.geturlparameter("p"),
        m: this.geturlparameter("m"),
      };
      for (var i in parties) {
        data[parties[i]] = this.feedback_party[parties[i]] == "Ja" ? 1 : 0;
      }
      backend_functions.send_useful_feedback(data);
      this.feedback_useful_send = true;
      this.calculated = false;
      this.statement = "";
      this.reset_feedback();
    },
    deleteInput() {
      this.statement = "";
      this.calculated = false;
    },
    reset_feedback() {
      this.useful_feedback = null;
      (this.feedback_party = {
        cdu: null,
        spd: null,
        grüne: null,
        fdp: null,
        linke: null,
        afd: null,
      }),
        (this.feedback_text = null);
    },
  },
  mounted() {
    backend_functions.get_ip().then((response) => {
      this.userIP = response.data.ip;
    });

    this.statement = this.geturlparameter("query");
    if (this.statement != "") {
      this.calculate();
    }
  },
};
</script>

<style>
</style>