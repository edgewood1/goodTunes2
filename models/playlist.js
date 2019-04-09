var mongoose = require("mongoose");

// User Schema
var PlaylistSchema = mongoose.Schema({
  artist: {
    type: String,
    index: true
  },
  title: {
    type: String
  },
  source: {
    type: String
  },
  sourceLink: {
    type: String
  },
  name: {
    type: String
  },
  userId: {
    type: Array
  }
  // associated this userID with the _id in users
  // note: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Note"
  // }
});

var Playlist = (module.exports = mongoose.model("Playlist", PlaylistSchema));

module.exports = Playlist;
