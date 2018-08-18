'use strict';

const requireUser = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('auth/login');
  };
  next();
};

const requireAnon = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/quotes');
  };
  next();
};

module.exports = {requireAnon, requireUser};
