var passport = require('passport');
var config = require('./config');
var commitsController = require('./controllers/commits');
var express = require('express');
var session = require('express-session');
var bodyParser  = require("body-parser");
var GithubStrategy = require('passport-github').Strategy;
var router = express.Router();

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

// Define the about route
router.use('/api/commits', commitsController);
router.get('/commits', function (req, res) {
    res.render('commits');
})
router.get('/manage', function (req, res) {
    res.render('manage');
})

router.get('/auth', passport.authenticate('github'));
router.use('/assets', [
    express.static(__dirname + '/node_modules/jquery/dist/'),
    express.static(__dirname + '/node_modules/jquery.easing/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/fonts/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/css/'),
    express.static(__dirname + '/node_modules/waypoints/lib/'),
    express.static(__dirname + '/node_modules/particles.js/'),
    express.static(__dirname + '/node_modules/ng-table/bundles/'),
    express.static(__dirname + '/node_modules/angular/'),
    express.static(__dirname + '/public/js/'),
    express.static(__dirname + '/public/images/'),
    express.static(__dirname + '/public/css/'),
]);
router.use(session({
    secret: config.session_secret,
    name: "runebase",
    resave: true,
    saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());
router.use(bodyParser.json());


// auth will call this URL
router.get('/auth/github',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/protected', ensureAuthenticated, function(req, res) {
  res.json("acess granted");
});
router.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

router.get('/', function (req, res) {
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

module.exports = router;