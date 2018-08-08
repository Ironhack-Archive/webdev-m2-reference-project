'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/quotes');
  }
  res.render('pages/index');
});

module.exports = router;
