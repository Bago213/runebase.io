var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
      console.log(res.os);
    auth = JSON.stringify(req.user, null, 4);
    res.render('manage', {auth: auth});
});

module.exports = router;
