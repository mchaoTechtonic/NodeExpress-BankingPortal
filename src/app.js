const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Task 2.4
app.use(express.static(path.join(__dirname, "public")));

//Task 3.1+3.2
const accountData = fs.readFileSync(
  path.join(__dirname, "json", "accounts.json"),
  { encoding: "utf8" }
);
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync(path.join(__dirname, "json", "users.json"), {
  encoding: "utf8",
});
const users = JSON.parse(userData);

// Task 2.7 -- the index route
app.get("/", function (req, res) {
  res.render("index", { title: "Index" });
});

// Task 2.8
app.listen(3000, () => {
  console.log("PS Project Running on port 3000!");
});
