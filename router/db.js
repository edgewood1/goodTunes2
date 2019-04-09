var express = require("express");
var router = express.Router();
var Playlist = require("../models/playlist");
var mongoose = require("mongoose");
var x = [];
// go through scrape, if not in db, add it.

router.post("/addScrape", function(req, res) {
  console.log("what x is ------", x);
  req.body.forEach((e, i) => {
    if (e.artist.length > 0) {
      var data = {
        artist: e.artist,
        title: e.title,
        source: e.source,
        sourceLink: e.sourceLink,
        name: e.name
        // userId: e.id
      };
      Playlist.find(data, function(err, doc) {
        if (doc.length < 1) {
          playlist = new Playlist(data);

          playlist.save(data, function(err, doc) {
            if (err) return res.send(500, { error: err });
            console.log("new tune ---   ", doc);
            x.push(doc);
            return x;
          });
        }
      });
    }
  });
  // console.log("doc ----- ", x);
  return res.send({
    message: "Scraped Finished - found " + x.length + " new songs"
  });
});

// 1. get all from db when component loads

router.get("/getPlaylist", function(req, res) {
  Playlist.find({}, function(err, docs) {
    if (err) return res.send(500, { error: err });
    res.send(docs);
  });
});

//////////////////////////////////////////////////////// user details

// user wants all tracks
router.get("/savedTunes/:id", function(req, res) {
  // var id = req.query.data;
  var id = req.params.id;
  console.log(id);
  Playlist.find({ userId: id }, function(err, doc) {
    console.log(doc);
    return res.send(doc);
  });
});

router.put("/removeUser", function(req, res) {
  console.log(req.body);
  var user = [req.body.userId];
  var song = req.body._id;
  console.log(user, song);
  Playlist.updateOne({ songId: song }, { $pullAll: { userId: user } }, function(
    response
  ) {
    console.log(response);
    res.send({ message: "song removed" });
  });
});

// user wants to save one track
router.post("/add", function(req, res) {
  var data = {
    artist: req.body.artist,
    title: req.body.title,
    source: req.body.source,
    sourceLink: req.body.sourceLink,
    name: req.body.name,
    userId: req.body.id
  };
  Playlist.find(data, function(err, doc) {
    if (doc.length > 0) {
      return res.send("already saved");
    } else {
      playlist = new Playlist(data);

      playlist.save(data, function(err, doc) {
        if (err) return res.send(500, { error: err });

        return res.send({ message: "succesfully saved", tune: data });
      });
    }
  });
});

// user wants to delete item
router.post("/deleteTunes", function(req, res) {
  var ObjectId = mongoose.Types.ObjectId;
  console.log("file to delete - ", req.body);

  var id = req.body._id;
  var removeThis = req.body.idToRemove;
  console.log("to remove ", removeThis);
  Playlist.update(
    { _id: ObjectId(id) },
    {
      $pull: { userId: { $in: [removeThis] } }
    },
    function(err, doc) {
      console.log(err);
      console.log("done -------", doc);
      return res.send(doc);
      // Playlist.update({})
    }
  );
  // Playlist.findByIdAndRemove(ObjectId(id), function(err, doc) {
  //   console.log(doc);
  //   if (err) return res.status(500).send(err);

  //   res.send({ message: "Tune Deleted", tune: "req.body" });
  // });
});

module.exports = router;
