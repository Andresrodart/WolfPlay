var express = require('express');
var router = express.Router();
var path = require('path');
var game_controller = require('../controllers/gameController');
var Game = require('../models/game');
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!req.session.userId) {
        res.redirect('/');
    }else
        res.render('home',{title: 'Home', user: req.session.user, mail: req.session.mail});//res.sendFile(path.join(__dirname, '../public/html/home.html'));//
});

router.get('/:game', function(req, res, next) {
    if (req.params.game == 'logout') {
        // delete session object
        req.session.destroy(function(err) {
          if(err) {
            return next(err);
          } else {
            return res.redirect('/');
          }
        });
      }
    if (!req.session.userId) {
        res.redirect('/');
    }else{
        res.render('game',{title: req.params.game, user: req.session.user, mail: req.session.mail});//
    }
});

router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      console.log("LogOut")
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });


router.post('/:game', game_controller.Game_update_post);

module.exports = router;
