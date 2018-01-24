const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fs = require("fs");
const bodyParser = require("body-parser");

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function(req, res) {
  const appConfig = dotenv.config({ path: ".env" });
  const defaults = dotenv.config({ path: ".env.example" });
  const config = Object.assign(appConfig.parsed || {}, defaults.parsed || {});

  res.render("index", {
    title: "Interactive Config",
    message: "Use this form to save your dotenv file",
    config: config
  });
});
app.post("/", function(req, res) {
  const lines = Object.keys(req.body).map(function(key) {
    return key + "=" + req.body[key];
  });
  lines.push("");
  fs.open(".env", "w", null, function(error, fd) {
    if (error) {
      console.log(error);
      return false;
    }
    fs.write(fd, lines.join("\n"), console.log);
  });

  res.send("Saved to .env file");
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
