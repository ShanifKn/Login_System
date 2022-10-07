const express = require("express");
const app = express();
const path = require("path");
const index = require("./routes/home");
const login = require("./routes/login");
// const Signup = require("./routes/Signup");
const logger = require("morgan");
const session = require("express-session");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// Session Cookie....................
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 9000 * 30 },
  })
);
// Cache removing .................
app.use((req, res, next) => {
  res.set(
    "Cache-control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", index);
app.use("/login", login);

app.listen(3000, () => console.log("server running"));
