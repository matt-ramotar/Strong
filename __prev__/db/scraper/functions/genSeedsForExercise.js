const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;

const { getName, getEquipmentType } = require('../../config').sel.GetExercises;

const exerciseTypes = {
  Cardio: 1,
  'Olympic Weightlifting': 2,
  Plyometrics: 3,
  Powerlifting: 4,
  Strength: 5,
  Stretching: 6,
  Strongman: 7,
};

const equipmentTypes = {
  Bands: 1,
  'Foam Roll': 2,
  Barbell: 3,
  Kettlebells: 4,
  'Body Only': 5,
  Machine: 6,
  Cable: 7,
  'Medicine Ball': 8,
  Dumbbell: 9,
  None: 10,
  'E-Z Curl Bar': 11,
  Other: 12,
  'Exercise Ball': 13,
};

const musclesMap = {
  Chest: 1,
  Forearms: 2,
  Lats: 3,
  'Middle Back': 4,
  'Lower Back': 5,
  Neck: 6,
  Quadriceps: 7,
  Hamstrings: 8,
  Calves: 9,
  Triceps: 10,
  Traps: 11,
  Shoulders: 12,
  Abdominals: 13,
  Glutes: 14,
  Biceps: 15,
  Adductors: 16,
};

const musclesArr = [
  'Chest',
  'Forearms',
  'Lats',
  'Middle Back',
  'Lower Back',
  'Neck',
  'Quadriceps',
  'Hamstrings',
  'Calves',
  'Triceps',
  'Traps',
  'Shoulders',
  'Abdominals',
  'Glutes',
  'Biceps',
  'Adductors',
];

async function getExercises() {
  const exercises = new Set();
  const exercise_muscles = new Set();
  for (muscleName of musclesArr) {
    const muscle = muscleName.replace(/ /g, '-').toLowerCase();

    let stop = false;
    let pageNumber = 1;
    do {
      const response = await axios.get(`https://www.bodybuilding.com/exercises/finder/${pageNumber}/?muscle=${muscle}`);
      const $ = cheerio.load(await response.data);

      for (let j = 2; j <= 17; j++) {
        const nameSel = getName.replace(/INDEX-j/g, j);
        const equipmentTypeSel = getEquipmentType.replace(/INDEX-j/g, j);

        const exerciseName = $(nameSel).text().trim();

        if (exerciseName === '' && j === 2) continue;
        if (exerciseName === '') {
          stop = true;
          break;
        }

        const link = $(nameSel).attr('href');
        const equipmentType = $(equipmentTypeSel).text().trim();
        const equipmentId = equipmentTypes[equipmentType];
        // FIXME: name consistent with db exerciseName -> name
        const exercise = {
          exerciseName,
          instructions: link,
          equipmentId,
          createdAt: 'new Date()',
          updatedAt: 'new Date()',
        };
        // FIXME: name consistent with db exercise -> exerciseId
        // FIXME: get IDs and save exerciseId muscleId
        const exercise_muscle = {
          exercise: exerciseName,
          muscle: muscleName,
        };

        // exercises.add(exercise);
        exercise_muscles.add(exercise_muscle);
      }
      pageNumber++;
    } while (!stop && pageNumber < 5);
  }
  //  await fs.writeFile(`../seeds/exercises.json`, JSON.stringify(Array.from(exercises)));
  await fs.writeFile(`../seeds/exercise_muscles.json`, JSON.stringify(Array.from(exercise_muscles)));
}
getExercises();
