var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var config = require('../config');

passport.use(new GithubStrategy({
    clientID: config.github_client_id,
    clientSecret: config.github_client_secret,
    callbackURL: config.host + "auth/github"
  },
  function(accessToken, refreshToken, profile, done) {
    // placeholder for translating profile into your own custom user object.
    // for now we will just use the profile object returned by GitHub
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  done(null, user);
});

exports.initialize = function() {
  return passport.initialize();
};

exports.initialize = function() {
  return passport.initialize();
};

exports.session = function() {
  return passport.session();
};

exports.authenticate = function() {
  return passport.authenticate('github');
};

exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
};
exports.getUser = function(req, res) {
    var auth = "";
    if (req.isAuthenticated()) {
        auth += JSON.stringify(req.user, null, 4);
    }
    return auth;
};