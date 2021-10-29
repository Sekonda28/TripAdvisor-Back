require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
const mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

app.get("/", (req, res) => {
  res.json("Welcome to my TripAdvisor-backend 🚀😎");
});

app.post("/form", async (req, res) => {
  const data = {
    from: `${req.fields.firstname} ${req.fields.lastname}  <${req.fields.email}>`,
    to: "matt.caswell@hotmail.com",
    subject: "Form submission!",
    text: `${req.fields.message}`,
  };

  mailgun.messages().send(data, (error, body) => {
    console.log(body);
    console.log(error);
    if (error === undefined) {
      // s'il n'y a pas eu d'erreur lors de l'envoi du mail, on envoie la réponse suivante au frontend :
      res
        .status(200)
        .json({ message: "Données du form bien reçues, mail envoyé." });
    } else {
      // s'il y a eu une erreur lors de l'envoi du mail, on envoie la réponse suivante au frontend :
      res.status(400).json(error);
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server started on Port 3000");
});

// "start": "node index.js"
