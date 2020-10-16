const express = require('express');
const router = express.Router();
const csrf = require('csurf');

const { Exercise, Muscle, sequelize, Program } = require('../../../db/models');

const { asyncHandler } = require('../../middleware/errors');

router.get(
  '/workouts/new',
  asyncHandler(async (req, res) => {
    const muscles = await Muscle.findAll({ order: [['name', 'asc']] });
    const exercises = await Exercise.findAll({ order: [['name', 'asc']] });

    const datetime = new Date();
    const timeString = datetime.toLocaleTimeString();
    const hours = datetime.getHours();
    const timeOfDay = timeString.match(/[AMP]/g).join('');
    const title = timeOfDay === 'AM' ? 'Morning Workout' : hours < 5 ? 'Afternoon Workout' : hours < 8 ? 'Evening Workout' : 'Night Workout';
    console.log(`timeString ${timeString} ----
    hours ${hours}
    timeOfDay ${timeOfDay}
    title ${title}
    `);

    res.render('workouts-new', {
      title,
      muscles,
      exercises,
    });
  })
);

module.exports = router;
