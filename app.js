var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";
var db = require('./db')

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("runebase");
  dbo.createCollection("commits", function(err, res) {
    if (err) throw err;
    db.close();
  });
}); 

var fs = require("fs");
var port = 3000;
var express = require("express");
var bodyParser  = require("body-parser");
var webhook = require('express-github-webhook');
var webhookHandler = webhook({ path: '/webhook', secret: '123456' });
var app = express();
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(bodyParser.json());
app.use(webhookHandler);

webhookHandler.on('push', function (repo, data) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runebase");
    var myobj = { git: data["commits"][0]["id"], tree_id: data["commits"][0]["tree_id"], message: console.log(data["commits"][0]["message"]), url: data["commits"][0]["url"], author: data["commits"][0]["author"]["name"] };
    dbo.collection("commits").insertOne(myobj, function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
});

app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder
app.use('/assets', [
    express.static(__dirname + '/node_modules/jquery/dist/'),
    express.static(__dirname + '/node_modules/jquery.easing/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/js/'), //?
    express.static(__dirname + '/node_modules/bootstrap/dist/fonts/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/css/'),
    express.static(__dirname + '/node_modules/waypoints/lib/'),
    express.static(__dirname + '/node_modules/particles.js/'),
    express.static(__dirname + '/public/js/'),
    express.static(__dirname + '/public/images/'),
    express.static(__dirname + '/public/css/'),
]);
app.use('/commits', require('./controllers/commits'))

app.get("/", function(request, response){ //root dir
    response.send(express.static(__dirname + "/public"));
});

//app.listen(port, () => console.log('app listening on port ' + port))
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
