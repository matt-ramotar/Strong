const express = require('express');
const { Muscle, Exercise } = require('../../db/models');
const { asyncHandler, validationErrorHandler } = require('../middleware/errors');

const csrfProtection = require('csurf')({ cookie: true });

const router = express.Router();

router.get('/login', csrfProtection, (req, res) => {
  if (req.user) {
    res.redirect('/home');
    return;
  }
  res.render('login', { csrf: req.csrfToken() });
});

router.get('/signup', csrfProtection, (req, res) => {
  if (req.user) {
    res.redirect('/home');
    return;
  }
  res.render('signup', { csrf: req.csrfToken() });
});

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const muscles = await Muscle.findAll();
    const exercises = await Exercise.findAll();
    res.render('start', { title: 'Mighty', exercises, muscles });
  })
);

module.exports = router;
