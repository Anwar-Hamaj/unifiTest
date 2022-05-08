const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 8000;

const runServer = async () => {
  try {
    mongoose
      .connect("mongodb://localhost:27017/unifiJobTest")
      .then(() => {
        console.log("Connected To unifiJobTest...");
        app.listen(port, () => console.log(`Server is up at port: ${port}`));
      })
      .catch(() => {
        console.error("SomeThing went wrong in unifiJobTest .. ");
      });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
runServer();
