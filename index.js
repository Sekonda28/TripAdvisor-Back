const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

app.post("/form", async (req, res) => {
  try {
    console.log(req.fields);
    res.status(200).json({ message: "Form successfully submitted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server started on Port 3000");
});
