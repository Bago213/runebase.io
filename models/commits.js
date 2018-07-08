var db = require('../db')

exports.all = function(cb) {
  var collection = db.get().collection('commits')
  collection.find().toArray(function(err, docs) {
  	console.log(docs)
    cb(err, docs)
  })
}
