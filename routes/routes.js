const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');

const { asyncHandler, handleValidationErrors } = require('../utils');
// const {}

const router = express.Router();

const { Exercise, Muscle, Program } = require('../../db/models');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const muscles = await Muscle.findAll();
    const exercises = await Exercise.findAll();
    res.render('start', { title: 'Mighty', exercises, muscles });
  })
);

module.exports = router;
