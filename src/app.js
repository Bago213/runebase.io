var express = require('express');
var config = require('./config');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var webhook = require('express-github-webhook');
var webhookHandler = webhook({ path: '/webhook', secret: config.webhook_secret });
var index = require('./routes/index');
var manager = require('./routes/manager');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(webhookHandler);
app.use('/', index);
app.use('/manager', manager);
app.use('/assets', [
    express.static(__dirname + '/../node_modules/vuetify/dist/'),
    express.static(__dirname + '/../node_modules/jquery/dist/'),
    express.static(__dirname + '/../node_modules/jquery.easing/'),
    express.static(__dirname + '/../node_modules/bootstrap/dist/js/'),
    express.static(__dirname + '/../node_modules/bootstrap/dist/fonts/'),
    express.static(__dirname + '/../node_modules/bootstrap/dist/css/'),
    express.static(__dirname + '/../node_modules/waypoints/lib/'),
    express.static(__dirname + '/../node_modules/particles.js/'),
    express.static(__dirname + '/../node_modules/ng-table/bundles/'),
    express.static(__dirname + '/../node_modules/angular/'),
    express.static(__dirname + '/../node_modules/vue/dist'),
    express.static(__dirname + '/../public/javascripts/'),
    express.static(__dirname + '/../public/images/'),
    express.static(__dirname + '/../public/css/'),
    express.static(__dirname + '/../public/fonts/'),
]);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

webhookHandler.on('push', function (repo, data) {
    savecommit(repo, data);
});

webhookHandler.on('issues', function (repo, data) {
    saveissue(repo, data);
});

module.exports = app;
