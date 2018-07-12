var config = require('./config');
var auth = require('./auth');
var bodyParser  = require("body-parser");
var express = require('express');
var session = require('express-session');
var commitsController = require('./controllers/commits');
var router = express.Router();
var useragent = require('./helpers/useragent').os;

router.use(session({
    secret: config.session_secret,
    name: "runebase",
    resave: true,
    saveUninitialized: true
}));
router.use(auth.initialize());
router.use(auth.session());
router.use(bodyParser.json());

router.use('/api/commits', commitsController);
router.get('/commits', function (req, res) {
    res.render('commits');
})

router.get('/auth', auth.authenticate());
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

router.use(useragent);

router.get('/manage', function (req, res) {

    console.log(res.os);
    auth = JSON.stringify(req.user, null, 4);
    res.render('manage', {auth: auth});
});

router.get('/auth/github',
  auth.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
});

router.get('/protected', auth.ensureAuthenticated, function(req, res) {
  res.json("acess granted");
});

router.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

router.get('/', function (req, res) {
    console.log(res.os); 
    auth = JSON.stringify(req.user, null, 4);
    res.render('index', {auth: auth, os: res.os})
});

module.exports = router;