var db = require('../db')

exports.all = function(cb, collection) {
  var collection = db.get().collection('commits')
  collection.find({}).sort({ "_id" : -1 }).toArray(function(err, docs) {
  	console.log(docs)
    cb(err, docs)
  })
}

exports.last = function(cb, collection) {
  var collection = db.get().collection('commits')
  collection.find({}).sort({ "_id" : -1 }).limit(5).toArray(function(err, docs) {

    cb(err, docs)
  })
}