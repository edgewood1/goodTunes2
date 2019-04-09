var axios = require("axios");
var cheerio = require("cheerio");
var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");

var scrape = [];

router.get("/scrape", function(req, res) {
  scrape = [];
  pitchfork().then(data => {
    console.log("next");
    hypeem().then(data => {
      indieShuffle().then(data => {
        var shuffledTopicArray = shuffle(data);

        function shuffle(sourceArray) {
          for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));

            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
          }
          return sourceArray;
        }
        // console.log(shuffledTopicArray);
        // console.log(data);
        res.send(shuffledTopicArray);
      });
    });
  });

  function pitchfork() {
    return new Promise(function(resolve, reject) {
      axios
        .get("http://www.pitchfork.com/reviews/best/tracks/")
        .then(function(response) {
          var result = {};
          // Load the HTML into cheerio and save it to a variable
          // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
          var $ = cheerio.load(response.data);

          var item = $(".track-collection-item__track-link");
          item.each(function(i, element) {
            result = {};
            result.artist = $(element)
              .find(".artist-list")
              .text();
            result.title = $(element)
              .find(".track-collection-item__title")
              .text();
            result.title = result["title"].replace(/\"/g, "");
            result.source =
              "https://raw.githubusercontent.com/mariegadda/tunesimgs/master/pitchfork_logo.png";
            result.sourceLink = "http://www.pitchfork.com/reviews/best/tracks/";
            result.name = "pitchfork";
            scrape.push(result);
          }); // loop ends
          resolve(scrape);
        }) // .then ends
        .catch(function(error) {
          console.log(error);
        });
    });
  }

  function hypeem() {
    return new Promise(function(resolve, reject) {
      console.log("h");
      axios
        .get("http://www.hypem.com/stack/")
        .then(function(response, html) {
          var result = {};
          var $ = cheerio.load(response.data);
          var item = $(".track_name");
          item.each(function(i, element) {
            // console.log("print - ? ", element);
            result = {};
            result.artist = $(element)
              .children("a.artist")
              .text();

            result.title = $(element)
              .children("a.track")
              .text()
              .trim();

            result.source =
              "https://raw.githubusercontent.com/mariegadda/tunesimgs/master/stack_fb.png";
            result.sourceLink = "http://www.hypem.com/stack/";
            result.name = "hypem";
            console.log("hype");

            //   //use Tracks model to create new entries
            scrape.push(result);
            // entry.push(new Track(result));
            // console.log(result);
          });

          resolve(scrape);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }

  function indieShuffle() {
    return new Promise(function(resolve, reject) {
      axios
        .get("https://www.indieshuffle.com/new-songs")
        .then(function(response, html) {
          var result = {};
          var $ = cheerio.load(response.data);

          $("h5").each(function(i, element) {
            if (i >= 1) {
              result = {};
              result.song = $(element).text();

              if (
                result["song"].includes("-") &&
                !result["song"].includes("Ft.")
              ) {
                var index = result["song"].indexOf("-") + 2;
                result.title = result["song"].slice(index);

                result.artist = result["song"].slice(0, index - 2);
                result.source =
                  "https://raw.githubusercontent.com/mariegadda/tunesimgs/31ab5ea7639bcf8d329c4f392a8d47bcd9ec62d8/indie_shuffle_logo.png";
                result.sourceLink = "https://www.indieshuffle.com/new-songs";
                result.name = "indieshuffle";
              }
            }
            if (result.artist) {
              scrape.push(result);
            }
          }); // loop ends here
          resolve(scrape);
        }); // then ends
    }); // promise ends
  } //function neds
}); // router ends
module.exports = router;
