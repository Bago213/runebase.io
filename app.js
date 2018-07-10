require('./tools')();
var db = require('./db');
var config = require('./config');
var express = require("express");
var bodyParser  = require("body-parser");
var webhook = require('express-github-webhook');
var webhookHandler = webhook({ path: '/webhook', secret: '123456' });
var app = express();
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var session = require('express-session');
var commitsModel = require('./models/commits');


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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')
app.use(require('./routes'))
app.use(session({
    secret: config.session_secret,
    name: "runebase",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(webhookHandler);



// auth will call this URL
app.get('/auth/github',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/protected', ensureAuthenticated, function(req, res) {
  res.json("acess granted");
});
app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

app.get('/', function (req, res) {
  last("commits", function(err, commits) {
    last("issues", function(err, issues) {   
  var auth = "";
  if (req.isAuthenticated()) {
    auth += JSON.stringify(req.user, null, 4);
  }
    res.render('index', {commits: commits, issues: issues, auth: auth})
  })
  })
})

webhookHandler.on('push', function (repo, data) {
savecommit(repo, data)
});
webhookHandler.on('issues', function (repo, data) {
saveissue(repo, data)
});

db.connect(function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})
