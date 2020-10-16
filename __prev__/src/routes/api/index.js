const express = require('express');
const { ValidationError } = require('sequelize');

const { environment } = require('../../../config');
const usersRouter = require('./users');
const exercisesRouter = require('./exercises');
const musclesRouter = require('./muscles');
const programsRouter = require('./programs');
const workoutsRouter = require('./workouts');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/exercises', exercisesRouter);
router.use('/muscles', musclesRouter);
router.use('/programs', programsRouter);
router.use('/workouts', workoutsRouter);

router.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map(e => e.message);
  }
  next(err);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === 'production';
  if (!isProduction) console.log(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

router.use('*', (req, res) => {
  res.status(404).json({ message: 'Route does not exist' });
});

module.exports = router;
