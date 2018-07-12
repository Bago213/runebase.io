var express = require('express')
  , router = express.Router()

var Manage = require('../models/manage')

router.get('/all', function(req, res) {
  Manage.all(function(err, docs) {
  	//console.log(docs[0]["git"])
  	res.json(docs)
    //res.render('commits', {data: JSON.stringify(docs)})
  })
})
router.get('/last', function(req, res) {
  Manage.last(function(err, docs) {
    res.json(docs)
  })
})

module.exports = router