var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;
const client = MongoClient(uri, { useUnifiedTopology: true });
var db = null;
var game = null;
client.connect(err => {
	if(err) throw err;
	db = client.db('wolfplay');
});
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'WolfPlay', index: 'true' });
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});/**/
router.get('/h_score', function(req, res, next){
	console.log(req.session.game)
    db.collection('games').findOne({name: req.session.game}).then((result) => {
		res.json({user:result.scores[result.scores.length - 1].gamer, score: result.scores[result.scores.length - 1].score});
	}).catch((err) => {
		res.json(false);
	});
});
router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }else
        res.redirect('/');
  });

module.exports = router;
