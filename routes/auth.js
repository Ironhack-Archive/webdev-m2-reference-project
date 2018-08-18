'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
const bcryptSalt = 10;
const auth = require('../middlewares/auth');


// ---------- GET - Signup ---------- //
router.get('/signup', auth.requireAnon, (req, res, next) => {
  const data = { errorMessage: req.flash('signupError') };
  res.render('pages/auth/signup', data);
});


// ---------- POST - Signup ---------- //
router.post('/signup', auth.requireAnon, (req, res, next) => {

  const {username, password, email} = req.body;

  if (!username) {
    req.flash('signupError', 'Please provide username');
    return res.redirect('/auth/signup');
  };

  if (!password) {
    req.flash('signupError', 'Please provide password');
    return res.redirect('/auth/signup');
  }

  if (!email) {
    req.flash('signupError', 'Please provide email');
    return res.redirect('/auth/signup');
  }

  User.findOne({ username })
    .then(result => {
      if (result) {
        req.flash('signupError', 'Username already taken');
        return res.redirect('/auth/signup');
      } else {
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const user = User({
          username,
          password: hashPass,
          email
        });
        user.save()
          .then(() => {
            req.session.user = user;
            req.flash('welcomeMessage', 'Welcome back!');
            return res.redirect('/quotes');
          })
          .catch(next);
      };
    });
});


// ---------- GET - Login ---------- //
router.get('/login', auth.requireAnon, (req, res, next) => {
  
  const data = { errorMessage: req.flash('loginError') };
  res.render('pages/auth/login', data);
});


// ---------- POST - Login ---------- //
router.post('/login', auth.requireAnon, (req, res, next) => {
  
  const {username, password} = req.body;

  User.findOne({ username })
    .then(result => {
      if (!result) {
        req.flash('loginError', 'User can not be found');
        return res.redirect('/auth/login');
      } else if (bcrypt.compareSync(password, result.password)) {
        req.session.user = result;
        req.flash('welcomeMessage', 'Welcome back!');
        return res.redirect('/quotes');
      } else {
        req.flash('loginError', 'Username or password are incorrect');
        return res.redirect('/auth/login');
      }
    })
    .catch(next);
});


// ---------- POST - Logout ---------- //
router.post('/logout', auth.requireUser, (req, res, next) => {
  
  delete req.session.user;
  return res.redirect('/');
});

module.exports = router;
