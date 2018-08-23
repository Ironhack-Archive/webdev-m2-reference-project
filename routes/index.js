'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');


// ---------- GET - Home ---------- //
router.get('/', auth.requireAnon, (req, res, next) => {
  
  res.render('pages/index');
});

module.exports = router;
