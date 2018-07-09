
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";
var state = {
  db: null,
}

exports.connect = function(done) {
  if (state.db) return done()

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) return done(err)
    state.db = db.db("runebase")
    done()
  })
}

exports.get = function() {
  return state.db
}

exports.createCollection = function(collection, done) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) return done(err)
    var dbo = db.db("runebase");
    dbo.createCollection(collection, function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
}

exports.insert = function(myobj, collection) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runebase");
    console.log(myobj.git);
    dbo.collection(collection).insertOne(myobj, function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
}
exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}
