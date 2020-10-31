const fs = require("fs");
const path = require("path");

const accountData = fs.readFileSync(
  path.join(__dirname, "json", "accounts.json"),
  { encoding: "utf8" }
);
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync(path.join(__dirname, "json", "users.json"), {
  encoding: "utf8",
});
const users = JSON.parse(userData);

/*
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
*/
const writeJSON = () => {
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(
    path.join(__dirname, "json", "accounts.json"),
    accountsJSON,
    "utf8"
  );
};

module.exports = { accounts, users, writeJSON };
