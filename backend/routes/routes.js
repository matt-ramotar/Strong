const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const fs = require('fs').promises;

const { Exercise, Muscle, sequelize } = require('../models');

const csrfProtection = csrf({ cookie: true });

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

const mapExerciseIds = exercises => {
  const map = new Map();
  for (exercise of exercises) {
    map.set(exercise.name, exercise.id);
  }
  return map;
};

const mapMuscleIds = muscles => {
  const map = new Map();
  for (muscle of muscles) {
    map.set(muscle.name, muscle.id);
  }
  return map;
};

const saveIds = async () => {
  const muscles = await Muscle.findAll();
  const exercises = await Exercise.findAll();

  const exercisesMap = mapExerciseIds(await exercises);
  await fs.writeFile('./exerciseId.json', JSON.stringify(Array.from(exercisesMap)));
  const musclesMap = mapMuscleIds(await muscles);
  await fs.writeFile('./muscleIds.json', JSON.stringify(Array.from(musclesMap)));
};

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const muscles = await Muscle.findAll();
    const name = 'Chest';
    const exercises = (await Muscle.findOne({ where: { name }, include: Exercise })).Exercises;
    console.log(await exercises[0]);
    // const exercises = await Exercise.findAll({ where: { id: 1 }, include: Muscle });

    res.render('start', { title: 'Mighty', exercises, muscles });
  })
);

router.get(
  '/muscle/:name',
  asyncHandler(async (req, res) => {
    const muscles = await Muscle.findAll();
    const exercises = await Exercise.findAll();
    const name = req.params.name.replace(/-/g, ' ');
    const muscle = await Muscle.findOne({
      where: sequelize.where(sequelize.fn('lower', sequelize.col('name')), sequelize.fn('lower', name)),
      include: Exercise,
    });
    const muscleExercises = (await muscle).Exercises;
    res.render('muscle', { title: name, muscle, muscles, exercises, muscle, muscleExercises });
  })
);

router.get(
  '/add-workout',
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

    res.render('add-workout', {
      title,
      muscles,
      exercises,
    });
  })
);

module.exports = router;
