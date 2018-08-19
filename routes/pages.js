'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

var pagesController = require('../controllers/pages');

router.get('/', auth.requireAnon, pagesController.home ); // ---------- GET - Homepage ---------- //

module.exports = router;
