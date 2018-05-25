var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'WolfPlay', index: 'true' });
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});/**/

module.exports = router;
