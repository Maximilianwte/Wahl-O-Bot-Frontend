// https://jackwhiting.co.uk/posts/using-firebase-admin-sdk-with-netlify-lambda-functions/
const express = require("express");
const serverless = require("serverless-http");

// Firestore

var admin = require("firebase-admin");

var serviceAccount = {
  type: "service_account",
  project_id: "uhh-wahlcheck-ai",
  private_key_id: process.env.VUE_APP_FIREBASE_PRIVATE_ID,
  private_key: process.env.VUE_APP_FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
  client_email: "firebase-adminsdk-n9jjt@uhh-wahlcheck-ai.iam.gserviceaccount.com",
  client_id: "109089163775563397101",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-n9jjt%40uhh-wahlcheck-ai.iam.gserviceaccount.com"
} 
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://uhh-wahlcheck-ai.firebaseio.com",
  });
}
let db = admin.firestore();

// Express App
const app = express();
const router = express.Router();

// Firestore Routes

router.get("/", (req, res) => {
  res.send("This route only user related requests.");
});

router.post("/send_statement", function(req, res) {
  var inFile = JSON.parse(req.body);
  let docRef = db.collection("usage:entered_statements");
  docRef
    .add({
      statement: inFile.statement,
      ip: inFile.ip,
      time: new Date(),
    })
    .then((ref) => {
      // track usage in characters
      // !
      let docRef = db
        .collection("usage:characters")
        .where("id", "==", "characters")
        .limit(1);
      docRef.get().then((snapshot) => {
        // if there is no usage yet, create the data
        if (snapshot.empty) {
          let docRef = db.collection("usage:characters");
          docRef
            .add({
              id: "characters",
              n: inFile.statement.length * 6,
            })
            .then((ref) => {
              res.status(200).send("statement sent");
            });
        }
        // if there is usage update the data
        docRef
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              db.collection("usage:characters")
                .doc(doc.id)
                .update({
                  n: doc.data().n + inFile.statement.length * 6,
                })
                .then(function() {
                  res.status(200).send("statement sent");
                });
            });
          })
          .catch((err) => {
            res.status(406).send("Could not sent statement.");
          });
      });
    });
});

router.get("/check_allowance", function(req, res) {
  let docRef = db
    .collection("usage:characters")
    .where("id", "==", "characters")
    .limit(1);
  docRef
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        res.status(200).send("No usage yet documented");
      }
      snapshot.forEach((doc) => {
        var data = doc.data();
        if (data.n < 4000000) {
          res.status(200).send("usage allowed");
        } else {
          res.status(202).send("usage not allowed");
        }
      });
    })
    .catch((err) => {
      res.status(406).send("Error while retreiving usage");
    });
});

router.post("/send_useful", function(req, res) {
  var inFile = JSON.parse(req.body);
  let docRef = db.collection("feedback:useful");
  docRef
    .add({
      statement: inFile.statement,
      correctPredicted: inFile.correctPredicted,
      ip: inFile.ip,
      p: inFile.p,
      m: inFile.m,
      cdu: inFile.cdu,
      spd: inFile.spd,
      fdp: inFile.fdp,
      grüne: inFile.grüne,
      linke: inFile.linke,
      afd: inFile.afd,
      time: new Date(),
    })
    .then((ref) => {
      res.sendStatus(200);
    });
});

router.post("/send_feedback", function(req, res) {
  var inFile = JSON.parse(req.body);
  let docRef = db.collection("feedback:text");
  docRef
    .add({
      statement: inFile.statement,
      feedback: inFile.feedback,
      ip: inFile.ip,
      cdu: inFile.cdu,
      spd: inFile.spd,
      fdp: inFile.fdp,
      grüne: inFile.grüne,
      linke: inFile.linke,
      afd: inFile.afd,
      time: new Date(),
    })
    .then((ref) => {
      res.sendStatus(200);
    });
});

router.post("/send_request_more_information", function(req, res) {
  var inFile = JSON.parse(req.body);
  let docRef = db.collection("request_more_information");
  docRef
    .doc(inFile.reqID)
    .set({
      id: inFile.reqID,
      statement: inFile.statement,
      party: inFile.party,
      data: null,
      fulfilled: false,
      time: new Date(),
    })
  const observer = docRef.doc(String(inFile.reqID)).onSnapshot(docSnapshot => {
    docRef
      .doc(String(inFile.reqID))
      .get()
      .then((doc) => {
        if (doc.exists) {
          var data = doc.data();
          if (data.fulfilled == true) {
            res.status(200).send(data);
            docRef.doc(inFile.reqID).delete();
            const unsub = docRef.doc(String(inFile.reqID)).onSnapshot(() => {
            });  
            unsub();
          }
        }
      });
  }, err => {
    console.log(`Encountered error: ${err}`);
  });
});

router.post("/collect_request_more_information", function(req, res) {
  var inFile = JSON.parse(req.body);
  const docRef = db.collection("request_more_information");
  docRef
    .doc(String(inFile.reqID))
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(202).send("No data found");
      } else {
        var data = doc.data();
        if (data.fulfilled == true) {
          res.status(200).send(JSON.stringify(data));
          docRef.doc(inFile.reqID).delete();
        } else {
          res.status(201).send("Request not fulfilled yet");
        }
      }
    });
});

app.use("/.netlify/functions/data", router);

module.exports.handler = serverless(app);
