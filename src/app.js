const fs = require("fs");
const path = require("path");

const express = require("express");
const { resolveSoa } = require("dns");

const app = express();

app.set("views", path.join(__dirname, "views")); //when we call .render() below, our app checks in this folder
app.set("view engine", "ejs");

// Task 2.4
app.use(express.static(path.join(__dirname, "public")));

//Task 4.1:
app.use(express.urlencoded({ extended: true }));

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

// Task 4.2
app.get("/transfer", function (req, res) {
  res.render("transfer");
});

app.post("/transfer", function (req, res) {
  const { from, to, amount } = req.body;
  accounts[from].balance -= parseInt(amount);
  accounts[to].balance += parseInt(amount);
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(
    path.join(__dirname, "json", "accounts.json"),
    accountsJSON,
    "utf8"
  );
  res.render("transfer", { message: "Transfer Completed" });
});

// Task 4.10
app.get("/payment", function (req, res) {
  res.render("payment", { account: accounts.credit });
});

// Task 2.8
app.listen(3000, () => {
  console.log("PS Project Running on port 3000!");
});
