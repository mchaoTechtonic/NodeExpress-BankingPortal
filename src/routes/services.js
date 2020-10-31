const express = require("express");
const router = express.Router();
const { writeJSON, accounts } = require("../data.js");

router.get("/transfer", function (req, res) {
  res.render("transfer");
});

router.post("/transfer", function (req, res) {
  const { from, to, amount } = req.body;
  accounts[from].balance -= parseInt(amount);
  accounts[to].balance += parseInt(amount);

  writeJSON();
  res.render("transfer", { message: "Transfer Completed" });
});

// Task 3.10
router.get("/payment", function (req, res) {
  res.render("payment", { account: accounts.credit });
});

// Task 3.10
router.post("/payment", function (req, res) {
  const { amount } = req.body;
  accounts.credit.balance -= parseInt(amount);
  accounts.credit.available += parseInt(amount);
  writeJSON();
  res.render("payment", {
    message: "Payment Successful",
    account: accounts.credit,
  });
});

module.exports = router;
