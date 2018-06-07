var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname, '../public/html/model/model.html'));
    //res.render('model', { title: 'My PEEEEERRO Page' });
    res.redirect('vrdocumentacion000webhostapp.com')
});



module.exports = router;
