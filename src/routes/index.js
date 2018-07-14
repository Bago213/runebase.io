var config = require('../config');
var auth = require('../helpers/auth');
var bodyParser  = require("body-parser");
var express = require('express');
var session = require('express-session');
var commitsController = require('../controllers/commits');
var useragent = require('../helpers/useragent').os;
var router = express.Router();

router.use(session({
    secret: config.session_secret,
    name: "runebase",
    resave: true,
    saveUninitialized: true
}));
router.use(auth.initialize());
router.use(auth.session());
router.use(bodyParser.json());
router.use(useragent);
router.use('/api/commits', commitsController);


router.get('/commits', function (req, res) {
    res.render('commits');
})
router.get('/auth', auth.authenticate());
router.get('/manage', function (req, res) {
    console.log(res.os);
    auth = JSON.stringify(req.user, null, 4);
    res.render('manage', {auth: auth});
});

router.get('/wallet', (req, res, next) => {
    res.render('wallet', { title: 'wallet' });
})

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
    res.render('index2', {auth: auth, os: res.os})
});

module.exports = router;