var express = require("express");
var router = express.Router();
var path = require("path");

// logged out --->

router.use(express.static("public"));

router.get("/isLogged", (req, res, next) => {
  if (req.user) {
    // get playlist
    // make a call to database based on users preferences.
  } else {
    // user not logged in
    //so login open module
  }
});

module.exports = router;
