var express = require("express");
var router = express.Router();
var dotenv = require("dotenv");
var axios = require("axios");
var request = require("request");
var client_id = "16060a1e148546a3b55d02d0152e5c83";
var client_secret = "bad56cc2ca3945d6a83c243de87bebe7";
router.get("/spotify2/:title/:artist", function(req, res) {
  //removing spaces in the title for the query

  var redirect_uri;
  var artist = req.params.artist;

  // artist = artist.replace(/ /gi, "%20");
  var songName = req.params.title;
  // songName = songName.replace(/ /gi, "%20");
  // songName = songName.replace(/,/gi, "%2C");

  console.log("name of song in routes: " + songName);
  var requestUrl =
    "https://api.spotify.com/v1/search?q=track:" +
    songName +
    "&artist:" +
    artist +
    "&type=track&limit=1";

  // var requestUrl =
  //   "https://api.spotify.com/v1/search?q=track:" +
  //   songName +
  //   "%20artist:" +
  //   artist +
  //   "&type=track&limit=1";

  requestUrl = encodeURI(requestUrl);
  // console.log(requestUrl);

  function runQuery() {
    console.log("in runQuery");
    // your application requests authorization

    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      //   form: {
      //     grant_type: "client_credentials"
      //   },
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   auth: {
      //     username: client_id,
      //     password: client_secret
      //   }
      // };
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64")
        // Authorization:
        //   "Basic" +
        //   new Buffer.from(client_id + ":" + client_secret).toString("base64")
      },
      form: {
        grant_type: "client_credentials"
        // grant_type: "authorization_code"
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      console.log(response.statusCode); // 200
      console.log("body - ", body);
      console.log(error);
      if (!error && response.statusCode === 200) {
        // console.log("url --" + requestUrl);
        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
          url: requestUrl,
          headers: {
            Authorization: "Bearer " + token
          },
          json: true
        };
        /// second call
        request.get(options, function(error, response, body) {
          // console.log(response); // bombs
          console.log("2nd body - ", body);

          if (error) {
            console.log(error);
            res.send(error);
          }
          if (body.tracks === undefined || body.tracks.items[0] === undefined) {
            console.log("broken");
            var id = "#";
            res.send(id);
          } else {
            var id = body.tracks.items[0].id;
            console.log(id);
            res.send(id);
          }
        });
      }
    });
  }
  runQuery();
});

module.exports = router;
// ----
