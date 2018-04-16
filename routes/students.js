'use strict';

const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const faker = require('faker');

// ---------- Index ---------- //
router.get('/', (req, res, next) => {
  if (req.query.bootcamp || req.query.month || req.query.year || req.query.city) {
    // const bootcamp = req.query.bootcamp !== 'bootcamp' ? req.query.bootcamp + ' ' : '';
    // const month = req.query.month !== 'month' ? req.query.month + ' ' : '';
    // const year = req.query.year !== 'year' ? req.query.year + ' ' : '';
    // const city = req.query.city !== 'city' ? req.query.city : '';
    // const filterString = bootcamp + month + year + city;
    // console.log(filterString);
  } else {
    Student.find({})
      .then((result) => {
        const data = { students: result };
        res.render('pages/students/index', data);
      });
  };
});

// ---------- Random ---------- //
router.get('/random', (req, res, next) => {
  Student.find({})
    .then((result) => {
      console.log(result);
      const rand = result[Math.floor(Math.random() * result.length)];
      const data = { student: rand };
      res.render('pages/students/show', data);
    });
});

// ---------- New ---------- //
router.get('/new', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('auth/login');
  };
  res.render('pages/students/new');
});

// ---------- Show ---------- //
router.get('/:id', (req, res, next) => {
  Student.findOne({_id: req.params.id})
    .then((result) => {
      const data = { student: result };
      res.render('pages/students/show', data);
    });
});

// ---------- Create ---------- //
router.post('/', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('auth/login');
  };

  const student = new Student(req.body);
  student.photo = faker.image.avatar();
  student.save()
    .then(() => {
      res.redirect(`/students/${student._id}`);
    });
});

// ---------- Edit ---------- //
router.get('/:id/edit', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('auth/login');
  };
  Student.findOne({ _id: req.params.id })
    .then((result) => {
      const data = { student: result };
      res.render('pages/students/edit', data);
    });
});

// ---------- Update --------- //
router.post('/:id', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('auth/login');
  };
  const data = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  };
  Student.update({ _id: req.params.id }, data)
    .then(() => {
      res.redirect(`/students/${req.params.id}`);
    });
});

// ---------- Delete ---------- //
router.post('/:id/delete', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('auth/login');
  };
  Student.remove({ _id: req.params.id })
    .then(() => {
      res.redirect(`/students`);
    });
});

module.exports = router;
