var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";
var db = require('./db')
var express = require("express");
var bodyParser  = require("body-parser");

var app = express();
module.exports = function() { 
    this.savecommit = function(repo,data) { 
    	  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runebase");
    console.log(data)
    var myobj = { git: data["commits"][0]["id"], tree_id: data["commits"][0]["tree_id"], message: console.log(data["commits"][0]["message"]), url: data["commits"][0]["url"], author: data["commits"][0]["author"]["name"] };
    dbo.collection("commits").insertOne(myobj, function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
    };
}