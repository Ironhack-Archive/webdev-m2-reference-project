'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
const bcryptSalt = 10;

const auth = require('../middlewares/auth');

var authController = require('../controllers/auth');

router.get('/signup', auth.requireAnon, authController.signupGet );   // ---------- GET  - Signup ---------- //
router.post('/signup', auth.requireAnon, authController.signupPost ); // ---------- POST - Signup ---------- //
router.get('/login', auth.requireAnon, authController.loginGet );     // ---------- GET  - Login  ---------- //
router.post('/login', auth.requireAnon, authController.loginPost );   // ---------- POST - Login  ---------- //
router.post('/logout', auth.requireUser, authController.logout );     // ---------- POST - Logout ---------- //

module.exports = router;
