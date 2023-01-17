// https://jackwhiting.co.uk/posts/using-firebase-admin-sdk-with-netlify-lambda-functions/
/* require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder'); */

const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");


const API_TOKEN = process.env.VUE_APP_HUGGINGFACE_TOKEN;
const MODEL_URL_UHH =
  "https://api-inference.huggingface.co/models/UHH-CI/GermanPolitical-Gelectra-base";

// Express App
const app = express();
const router = express.Router();

// Firestore Routes

router.get("/", (req, res) => {
  res.send("This route only ml related requests.");
});

router.post("/predict", function(req, res) {
  var INPUT = JSON.parse(req.body);
  var parties = ["cdu/csu", "spd", "grüne", "fdp", "die linke", "afd"];
  var input = [];
  for (let i = 0; i < parties.length; i++) {
    input.push(parties[i] + ": " + INPUT.statement);
  }
  axios
    .post(MODEL_URL_UHH, JSON.stringify(input), {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    })
    .then((response) => {
      var output = {};
      for (let i = 0; i < response.data.length; i++) {
        output[parties[i]] = response.data[i].find(obj => {
          return obj.label === "LABEL_0"
        }).score;
      }
      res.send(JSON.stringify(output));
    })
    .catch((error) => {
      console.log(error);
      res.send("Model is loading").status(201);
    });
});

app.use("/.netlify/functions/ml", router);

module.exports.handler = serverless(app);
