const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//use cors
app.use(require("cors")());

//Home page
app.get("/", (req, res, next) => {
  res.status(200).send("<h1 style='color:red'}>Server is up </h1>");
});

app.use("/auth", require("./routes/auth"));
app.use("/todo", require("./routes/todo"));

module.exports = app;
