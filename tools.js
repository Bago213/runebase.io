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
}