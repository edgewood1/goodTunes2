const passport = require("passport");
const keys = require("./keys");
const User = require("../models/users");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var LocalStrategy = require("passport-local").Strategy;

// grabs an item and stuff into cookie

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// passport.deserializeUser(function(user, done) {
//   User.findById(user).then(user => {
//     done(null, user._id);
//   });
// });

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // check if user is in the db
      currentUser = null;
      console.log("lookgin for ... ", profile.id);
      User.findOne({ googleID: profile.id }).then(currentUser => {
        if (currentUser) {
          console.log("old user!");
          //already have user
          console.log("user is ", currentUser);
          // done will go to serializer...
          done(null, currentUser);
        } else {
          // create new user
          console.log("create new user");
          new User({
            username: profile.displayName,
            googleID: profile.id
          })
            .save()
            .then(newUser => {
              console.log("new User created: " + newUser);
              //   done(profile);
              done(null, newUser);
            });
        }
      });
    }
  )
);

passport.use(
  "register",
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }).then(currentUser => {
      if (err) throw err;
      if (currentUser) {
        //already have user
        console.log("user is ", currentUser);
        // done will go to serializer...
        done(null, false, { message: "Login: You're already in the system" });
      } else {
        // create new user
        var newUser = new User({
          username: username,
          password: password
        });

        User.createUser(newUser, function(err, user) {
          if (err) throw err;

          return done(null, user, { message: "user created!! " });
        });
      }
    });
  })
);

passport.use(
  "login",
  new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      console.log("hit passport");
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "Unknown User" });
      }
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user, { message: "your saved playlist" });
        } else {
          return done(null, false, { message: "Invalid password - try again" });
        }
      });
    });
  })
);

module.exports = passport;
