var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  let userIDname = req.session.user;
  res.render("index", { userIDname });
});

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
