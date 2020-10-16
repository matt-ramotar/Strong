const express = require('express');
const router = express.Router();
const csrf = require('csurf');

const { Exercise, Muscle, sequelize, Program } = require('../../../db/models');
const { asyncHandler } = require('../../middleware/errors');

router.get(
  '/muscle/:muscleId',
  asyncHandler(async (req, res) => {
    const muscles = await Muscle.findAll();
    const exercises = await Exercise.findAll();
    const name = req.params.muscleId.replace(/-/g, ' ');
    const muscle = await Muscle.findOne({
      where: sequelize.where(sequelize.fn('lower', sequelize.col('name')), sequelize.fn('lower', name)),
      include: Exercise,
    });
    const muscleExercises = (await muscle).Exercises;
    res.render('muscle', { title: name, muscle, muscles, exercises, muscle, muscleExercises });
  })
);

module.exports = router;
