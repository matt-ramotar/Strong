const express = require('express');
const db = require('../../db/models');
const { asyncHandler, validationErrorHandler } = require('../middleware/errors');

const csrfProtection = require('csurf')({ cookie: true });

const router = express.Router();

router.get('/login', csrfProtection, async (req, res) => {
  const muscles = await db.Muscle.findAll();
  const exercises = await db.Exercise.findAll();
  if (req.user) {
    res.redirect('/home');
    return;
  }
  res.render('login', { csrf: req.csrfToken(), muscles, exercises });
});

router.get('/signup', csrfProtection, async (req, res) => {
  const muscles = await db.Muscle.findAll();
  const exercises = await db.Exercise.findAll();
  if (req.user) {
    res.redirect('/home');
    return;
  }
  res.render('signup', { csrf: req.csrfToken() });
});

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const muscles = req.muscles,
      exercises = req.exercises;
    res.render('home', { title: 'Mighty', muscles, exercises });
  })
);

module.exports = router;
