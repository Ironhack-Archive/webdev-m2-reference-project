'use strict';

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

var User = require('../models/user');

// ---------- Shows signup form ---------- //
exports.signupGet = (req, res, next) => {
	const data = { errorMessage: req.flash('signupError') };
	res.render('pages/auth/signup', data);
};

// ---------- Creates a new user ---------- //
exports.signupPost = (req, res, next) => {
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
};

// ---------- Shows login form ---------- //
exports.loginGet = (req, res, next) => {
	const data = { errorMessage: req.flash('loginError') };
	res.render('pages/auth/login', data);
};

// ---------- Creates a session ---------- //
exports.loginPost = (req, res, next) => {
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
};

// ---------- Deletes the user from the session ---------- //
exports.logout = (req, res, next) => {
	delete req.session.user;
	return res.redirect('/');
};
