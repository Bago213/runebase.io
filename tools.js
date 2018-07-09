var url = "mongodb://localhost:27017/";
var db = require('./db')
var express = require("express");
var bodyParser  = require("body-parser");
var app = express();

module.exports = function() { 
    this.savecommit = function(repo,data) {
      var myobj = { git: data["commits"][0]["id"], tree_id: data["commits"][0]["tree_id"], message: console.log(data["commits"][0]["message"]), url: data["commits"][0]["url"], author: data["commits"][0]["author"]["name"] };
      db.insert(url, myobj, "commits");  
  };
    this.saveissue = function(repo,data) { 
    	console.log(data["issue"])
    	console.log(data["issue"]["title"])
      var myobj = { id: data["issue"]["id"], title: data["issue"]["title"], html_url: data["issue"]["html_url"], comments: data["issue"]["comments"], state: data["issue"]["state"] };
      db.insert(url, myobj, "issues");  
  };
this.all = function(collection, cb) {
  var collection = db.get().collection(collection)
  collection.find({}).sort({ "_id" : -1 }).toArray(function(err, docs) {
  	console.log(docs)
    cb(err, docs)
  })
}

this.last = function(collection, cb) {
  var collection = db.get().collection(collection)
  collection.find({}).sort({ "_id" : -1 }).limit(5).toArray(function(err, docs) {
  	console.log(docs)
    cb(err, docs)
  })
}
}