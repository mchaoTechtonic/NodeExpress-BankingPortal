const fs = require("fs");
const path = require("path");

const express = require("express");
const { resolveSoa } = require("dns");

const app = express();

app.set("views", path.join(__dirname, "views")); //when we call .render() below, our app checks in this folder
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
  res.render("index", { title: "Account Summary", accounts });
});

// Task 3.5-6 -- the savings route, and the other two routes
app.get("/savings", function (req, res) {
  res.render("account", { account: accounts.savings });
});

app.get("/checking", function (req, res) {
  res.render("account", { account: accounts.checking });
});
app.get("/credit", function (req, res) {
  res.render("account", { account: accounts.credit });
});

// Task 3.10
app.get("/profile", function (req, res) {
  res.render("profile", { user: users[0] });
});

// Task 2.8
app.listen(3000, () => {
  console.log("PS Project Running on port 3000!");
});
