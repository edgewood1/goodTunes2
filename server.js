var express = require("express");

var app = express();
var port = process.env.PORT || 3001;
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var passport = require("passport");
const cookieSession = require("cookie-session");

var passportSetup = require("./config/passport");
var path = require("path");
var flash = require("connect-flash");
var keys = require("./config/keys");
// get an instance of router
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Conenct to DB
// mongoose.connect(keys.mongo.id);
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

var db = mongoose.connection;
// Parse JSON from request, add Session and add passport middleware

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(flash());
// Express Session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Session: An object saved by the backend for one user.

// Let's add an endpoint to save users to database. (P.S. Nothing from passport is used here)

app.use("/", require("./router/auth"));
app.use("/", require("./router/db"));
app.use("/", require("./router/pages"));
app.use("/", require("./router/scraper"));
app.use("/", require("./router/api"));

app.listen(port, () => console.log("App listening on port " + port));
