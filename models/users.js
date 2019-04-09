var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

// const Schema = mongoose.Schema;

// name of the collection , name of schema to use on it.
// name of collection pluralize in mLab
// const User = mongoose.model("user", userSchema);

// User Schema
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  googleID: {
    type: String
  },
  password: {
    type: String
  },
  data: {
    type: Array
  },
  message: {
    type: String
  }
  //   email: {
  //     type: String
  //   },
  //   name: {
  //     type: String
  //   }
});

var User = (module.exports = mongoose.model("User", UserSchema));

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username };
  User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    console.log("match? " + isMatch);
    callback(null, isMatch);
  });
};
