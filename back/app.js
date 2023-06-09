//code content of APP.JS
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

require("dotenv").config();

// MIDDLEWARE (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "auth-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("combined"));
//DATABASE
// **** change this below DB link to your mongoDB cluster ****
const DB = `mongodb+srv://KatiePragg:${process.env["MONGO_PASSWORD"]}@cluster0.ueuybnq.mongodb.net/crud-project?retryWrites=true&w=majority`; //insert your mongoDB link that emerges out of the process described in teams for step by step mongoDB creation. replace <password> part with password you have given to your main user at cluster creation

const PORT = 4000;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to Database");
  })
  .catch((err) => console.log(err));
//ROUTES
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("reached homepage");
});
// this below 'UserRoute' is a variable for this project (not syntax)
const UsersRoute = require("./routes/projects");
app.use("/projects", UsersRoute);
app.listen(PORT, () => {
  console.log("listening on port 4000");
});
