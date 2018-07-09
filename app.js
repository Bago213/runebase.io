require('./tools')();
var tools = require('./tools');
var url = "mongodb://localhost:27017/";
var db = require('./db')
var express = require("express");
var bodyParser  = require("body-parser");
var webhook = require('express-github-webhook');
var webhookHandler = webhook({ path: '/webhook', secret: '123456' });
var app = express();
var commitsController = require('./controllers/commits');
var commitsModel = require('./models/commits');


app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')
app.use(bodyParser.json());
app.use(webhookHandler);
app.use('/assets', [
    express.static(__dirname + '/node_modules/jquery/dist/'),
    express.static(__dirname + '/node_modules/jquery.easing/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/fonts/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/css/'),
    express.static(__dirname + '/node_modules/waypoints/lib/'),
    express.static(__dirname + '/node_modules/particles.js/'),
    express.static(__dirname + '/public/js/'),
    express.static(__dirname + '/public/images/'),
    express.static(__dirname + '/public/css/'),
]);
app.use('/commits', commitsController);

app.get('/', function (req, res) {
  last("commits", function(err, commits) {
    last("issues", function(err, issues) {

    res.render('index', {commits: commits})
  })
  })
})


db.createCollection(url, "commits")

webhookHandler.on('push', function (repo, data) {
savecommit(repo, data)
});
webhookHandler.on('issues', function (repo, data) {
saveissue(repo, data)
});

db.connect(url, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})
