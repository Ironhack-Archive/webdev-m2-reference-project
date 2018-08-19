'use strict';

var Quote = require('../models/quote');

// ---------- Shows all active forms ---------- //
exports.quoteList = (req, res, next) => {
  Quote.find({isActive: true}).populate('owner')
  .then((results) => {
    results.forEach((quote) => {
      quote.likes.forEach((likerId) => {
        const objectIdToNum = likerId.toString();
        if (objectIdToNum === req.session.user._id) {
          quote.set('currentUserLiked', true, {strict: false});
        }
      })
    })
    res.render('pages/quotes/index', { quotes: results });
  })
  .catch(next);
};

// ---------- Show the new quote form ---------- //
exports.quoteNew = (req, res, next) => {
  const data = { errorMessage: req.flash('newQuoteError') };
  res.render('pages/quotes/new', data);
};

// ---------- Creates a form ---------- //
exports.quoteCreate = (req, res, next) => {
  const {body, from, location} = req.body;

  let background;
  
  if (req.file) {
    background = (url => {
      const backgroundConfig = "w_360,h_368,c_crop";
      const array = url.split("/");
      array.splice(6, 0, backgroundConfig);
      array.splice(0, 2, "https:/");
      const parsedUrl = array.join("/");
      return parsedUrl;
    })(req.file.secure_url)
  }

  if (!body) {
    req.flash('newQuoteError', 'Cannot submit an empty quote');
    return res.redirect('/quotes/new');
  };

  if (!from) {
    req.flash('newQuoteError', 'Please tell us who said it');
    return res.redirect('/quotes/new');
  };

  if (!location) {
    req.flash('newQuoteError', 'Please tell us where you heared it');
    return res.redirect('/quotes/new');
  }

  if (!background) {
    req.flash('newQuoteError', 'Please upload a background picture');
    return res.redirect('/quotes/new');
  }

  const quote = new Quote({body, from, location, background});
  quote.owner = req.session.user;
  quote.save()
  .then(() => {
    res.redirect(`/quotes`);
  })
  .catch(next);
};

// ---------- Shows the quote edit form ---------- //
exports.quoteEdit = (req, res, next) => {
  Quote.findOne({ _id: req.params.id })
  .then((result) => {
    if (!result) {
      next();
      return;
    }
    const data = { 
      errorMessage: req.flash('newQuoteError'),
      quote: result 
    };
    res.render('pages/quotes/edit', data);
  })
  .catch(next);
};

// ---------- Updates a quote ---------- //
exports.quoteUpdate = (req, res, next) => {
  const {body, from, location} = req.body;

  let background;

  if (req.file) {
    background = (url => {
      const backgroundConfig = "w_360,h_368,c_fill";
      const array = url.split("/");
      array.splice(6, 0, backgroundConfig);
      array.splice(0, 2, "https:/");
      const parsedUrl = array.join("/");
      return parsedUrl;
    })(req.file.secure_url)
  } else {
    background = req.body.photo;
  }

  let isActive = true;

  if (req.body.delete === "on") {
    isActive = false;
  }

  Quote.findByIdAndUpdate(req.params.id, {body, from, location, isActive, background})
  .then(() => {
    res.redirect(`/quotes`);
  })
  .catch(next);
};
	
// ---------- Delete a quote ---------- //
exports.quoteDelete = (req, res, next) => {
  Quote.remove({ _id: req.params.id })
.then(() => {
    res.redirect(`/quotes`);
  })
  .catch(next);
};

// ---------- Toggle like in a quote ---------- //
exports.quoteLike = (req, res, next) => {
  const id = req.params.id;
  let alreadyLiked = false;
  let update = {};

  Quote.findById(id)
  .then((quote) => {
    quote.likes.forEach((like) => {
      if (like.equals(req.session.user._id)) {
        alreadyLiked = true;
      }
    });

    if (alreadyLiked) {
      update = { '$inc': { 'likeCount': -1 }, '$pull': { 'likes': req.session.user._id } };
    } else {
      update = { '$inc': { 'likeCount': 1 }, '$push': { 'likes': req.session.user._id } };
    }
    return Quote.findByIdAndUpdate(id, update, {new: true});
  })
  .then((quote) => {
    if (!alreadyLiked) {
      res.json({ action: 'liked', likes: quote.likeCount });
    } else {
      res.json({ action: 'unliked', likes: quote.likeCount });
    }
  })
  .catch(next);
};