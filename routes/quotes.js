'use strict';

const express = require('express');
const router = express.Router();
const Quote = require('../models/quote');

const upload = require('../middlewares/upload');
const auth = require('../middlewares/auth');

var quoteController = require('../controllers/quotes');


router.get('/', auth.requireUser, quoteController.quoteList );                               // ---------- GET  - Quote index  ---------- //
router.get('/new', auth.requireUser,  quoteController.quoteNew );                            // ---------- GET  - Quote new    ---------- //
router.post('/', auth.requireUser, upload.single('photo'), quoteController.quoteCreate );    // ---------- POST - Quote new    ---------- //
router.get('/:id/edit', auth.requireUser, quoteController.quoteEdit );                       // ---------- GET  - Quote edit   ---------- //
router.post('/:id', auth.requireUser, upload.single('photo'), quoteController.quoteUpdate ); // ---------- POST - Quote edit   ---------- //
router.post('/:id/delete', auth.requireUser, quoteController.quoteDelete );                  // ---------- POST - Quote delete ---------- //
router.post('/:id/like', auth.requireUser, quoteController.quoteLike );                      // ---------- POST - Quote like   ---------- //

module.exports = router;
