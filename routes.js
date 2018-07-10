var passport = require('passport');
var commitsController = require('./controllers/commits');
var express = require('express');
var router = express.Router();

// Define the about route
router.use('/api/commits', commitsController);
router.get('/commits', function (req, res) {
    res.render('commits');
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


module.exports = router;