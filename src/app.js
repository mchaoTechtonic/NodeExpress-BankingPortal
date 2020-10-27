const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Task 2.4
app.use(express.static(path.join(__dirname, "public")));

// Task 2.7
app.get("/", function (req, res) {
  res.render("index", { title: "Index" });
});

// Task 2.8
app.listen(3000,()=>{
    console.log("PS Project Running on port 3000!");
});