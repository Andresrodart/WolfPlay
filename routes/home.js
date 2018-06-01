var express = require('express');
var router = express.Router();
var path = require('path');
var game_controller = require('../controllers/gameController');
var Game = require('../models/game');
var mongoose = require('mongoose');
var math = require('mathjs');
var Complex = require('complex.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!req.session.userId) {
        res.redirect('/');
    }else
        res.render('home',{title: 'Home', user: req.session.user, mail: req.session.mail});//res.sendFile(path.join(__dirname, '../public/html/home.html'));//
});

router.get('/A_F', function(req, res, next){
    if (!req.session.userId)
        res.redirect('/');
    res.render('A_F',{title: 'WolfPlay', user: req.session.user, mail: req.session.mail});
});

router.post('/A_F', function(req, res, next){
    var a = req.body.numA;
    var b = req.body.numB;

    var c0 = new Complex({re:(a/2 + b/3),im: 0});
    var exp = `f(n) = (${a}(-1 + (-1)^n * (1 - i*n*pi)))/(2 * pi^2 * n^2) + (${b} * (-1)^n * (pi * n * (2 + i * pi * n) + (2 * i * (-1)^n) - 2 * i))/(2 * pi^3 * n^3)`;
    var matrix = new Array();

    let parser = math.parser();
    parser.eval(exp);
    
    for (let index = -10; index <= 10; index++){
        let auxNum = new Complex(parser.eval(`f(${index})`));
        matrix.push({abs: auxNum.abs(), ang: auxNum.arg()});
    }
    matrix.push(exp);
    matrix[10] = {abs: c0.abs(), ang: c0.arg()};
    return res.send(matrix);
    //res.render('A_F',{title: 'WolfPlay', user: req.session.user, mail: req.session.mail, respons:true});
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
