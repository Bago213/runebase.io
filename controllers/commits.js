var express = require('express')
  , router = express.Router()

var Commits = require('../models/commits')

router.get('/all', function(req, res) {
  Commits.all(function(err, docs) {
  	console.log(docs[0]["git"])
  	var git = docs[0]["git"]
    res.render('commits', {commits: docs})
  })
})

module.exports = router