var express = require('express')
  , router = express.Router()

var Commits = require('../models/commits')

router.get('/all', function(req, res) {
  Commits.all(function(err, docs) {
  	console.log(docs[0]["git"])
    res.render('commits', {commits: docs})
  })
})
router.get('/last', function(req, res) {
  Commits.last(function(err, docs) {
    res.render('commits', {commits: docs})
  })
})

module.exports = router