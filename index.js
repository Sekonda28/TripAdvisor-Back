const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
require("dotenv").config();
const mg = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;

const app = express();
app.use(formidable());
app.use(cors());

app.post("/form", async (req, res) => {
  try {
    const data = {
      from: `${req.fields.firstname} ${req.fields.lastname}  <${req.fields.email}>`,
      to: "matt.caswell@hotmail.com",
      subject: "Form submission!",
      text: `${req.fields.message}`,
    };
    mg.messages().send(data, function (error, body) {
      console.log(body);
    });
    res.status(200).json({ message: "Form successfully submitted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server started on Port 3000");
});
