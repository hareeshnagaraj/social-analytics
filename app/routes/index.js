var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Social Analytics' });
});

router.get('/active', function(req, res) {
  res.render('active', { title: 'Social Analytics' });
});



module.exports = router;
