require('./tools')();
var db = require('./db');
var config = require('./config');
var express = require("express");
var webhook = require('express-github-webhook');
var webhookHandler = webhook({ path: '/webhook', secret: config.webhook_secret });

var app = express();

app.engine('pug', require('pug').__express)
app.set('view engine', 'pug')
app.use(require('./routes'))
app.use(webhookHandler);

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
