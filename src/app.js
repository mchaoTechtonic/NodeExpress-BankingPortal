const fs = require("fs");
const path = require("path");
const express = require("express");
const { resolveSoa } = require("dns");

const { accounts, users, writeJSON } = require("./data.js");

const accountRoutes = require("./routes/accounts");
const servicesRoutes = require("./routes/services");
const app = express();

app.set("views", path.join(__dirname, "views")); //when we call .render() below, our app checks in this folder
app.set("view engine", "ejs");

// Task 2.4
app.use(express.static(path.join(__dirname, "public")));

//Task 4.1:
app.use(express.urlencoded({ extended: true }));

//Task 3.1+3.2
app.use("/account", accountRoutes);
// Task 2.7 -- the index route
app.get("/", function (req, res) {
  res.render("index", { title: "Account Summary", accounts });
});

// Task 3.5-6 -- the savings route, and the other two routes

// Task 3.10
app.get("/profile", function (req, res) {
  res.render("profile", { user: users[0] });
});

// Task 4.2
app.use("/services", servicesRoutes);

// Task 2.8
app.listen(3000, () => {
  console.log("PS Project Running on port 3000!");
});
