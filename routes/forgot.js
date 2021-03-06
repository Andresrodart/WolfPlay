var express = require('express');
var router = express.Router();
var path = require('path');
var Gamer = require('../models/gamer');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var flash = require('express-flash');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/', function(req, res) {
    res.render('forgot', {
      user: req.user
    });
});

router.post('/', function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
            });
        },
        function(token, done) {
            Gamer.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/forgot');
                }
  
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var mailOptions = {
                to: user.email,
                from: 'chiefalphadog@gmail.com',
                subject: 'Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };

            sgMail.send(mailOptions, false, (err) => {
                    if(err){
                        req.flash('error', 'An e-mail couldn\'t been sent to ' + user.email + ' :C');
                        done(err, 'done');
                    }
                    else{
                        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                        done(err, 'done');
                    }
            });
        }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/forgot');
    });
});

module.exports = router;