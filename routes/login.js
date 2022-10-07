var express = require("express");
var router = express.Router();
const user = require("./UserIDs");

let statusBar;
router.get("/", (req, res) => {
  if (req.session.loggedIN) {
    res.redirect("/");
  } else {
    res.render("login", { statusBar });
    statusBar = false;
  }
});

router.post("/", (req, res) => {
  const id = req.body;
  let userId = user.find(
    ({ email, pasword }) => email === id.email && pasword == id.password
  );
  if (userId === undefined) {
    statusBar = true;
    res.redirect("login");
  } else {
    req.session.loggedIN = true;
    req.session.user = userId.username;
    res.redirect("/");
  }
});

module.exports = router;
