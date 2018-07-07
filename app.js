var fs = require("fs");
var port = 3000;
var express = require("express");
var bodyParser  = require("body-parser");
var webhook = require('express-github-webhook');
var webhookHandler = webhook({ path: '/webhook', secret: '123456' });
var app = express();
app.use(bodyParser.json());
app.use(webhookHandler);
 
webhookHandler.on('*', function (event, repo, data) {
    console.log(data["commits"]);
});
webhookHandler.on('push', function (repo, data) {
    //console.log(data["commits"]);
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

app.get("/", function(request, response){ //root dir
    response.send(express.static(__dirname + "/public"));
});

app.listen(port, () => console.log('app listening on port ' + port))
