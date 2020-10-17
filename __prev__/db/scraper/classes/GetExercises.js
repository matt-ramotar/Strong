const axios = require('axios');
const cheerio = require('cheerio');

// const { Muscle } = require('../../backend/models');
const { getName, getEquipmentType } = require('../../config').sel.GetExercises;

async function test() {
  const muscles = [
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

  const exercises = [];

  for (muscle of muscles) {
    let pageNumber = 1;

    do {
      const response = await axios.get(`https://www.bodybuilding.com/exercises/finder/${pageNumber}/?muscle=${muscle}`);
      const $ = cheerio.load(await response.data);

      for (let j = 2; j <= 17; j++) {
        const nameSel = getName.replace(/INDEX-j/g, j);
        const equipmentTypeSel = getEquipmentType.replace(/INDEX-j/g, j);

        const name = $(nameSel).innerText;
        const link = $(nameSel).attr('href');
        const equipmentType = $(equipmentTypeSel).innerText;

        const exercise = {
          name,
          muscle,
          link,
          equipmentType,
        };

        exercises.push(exercise);
      }
      pageNumber++;
    } while (pageNumber < 4);
  }
  return exercises;
}

async function log() {
  const exercises = await test();
  console.log(exercises);
}

async function getNameTest() {
  let muscle = 'chest';
  const response = await axios.get(`https://www.bodybuilding.com/exercises/finder/1/?muscle=${muscle}`);
  const $ = cheerio.load(await response.data);

  const test = [];

  for (let i = 2; i <= 17; i++) {
    const nameSel = getName.replace(/INDEX-j/g, i);
    const equipmentTypeSel = getEquipmentType.replace(/INDEX-j/g, i);

    const name = $(nameSel).text().trim();

    if (name === '') continue;

    const link = $(nameSel).attr('href');
    const equipmentType = $(equipmentTypeSel).text().trim();

    const exercise = {
      name,
      muscle,
      link,
      equipmentType,
    };

    test.push(exercise);
    console.log(test);
  }
}

const id = () => {
  const exerciseTypes =
{
"Cardio" : 1,
"Olympic Weightlifting" : 2,
"Plyometrics" : 3,
"Powerlifting" : 4,
"Strength" : 5,
"Stretching" : 6,
"Strongman" : 7,
};

const equipment = {
"Bands" : 1,
"Foam Roll" : 2,
"Barbell" : 3,
"Kettlebells" : 4,
"Body Only" : 5,
"Machine" : 6,
"Cable" : 7,
"Medicine Ball" : 8,
"Dumbbell" : 9,
"None" : 10,
"E-Z Curl Bar" : 11,
"Other" : 12,
"Exercise Ball" : 13,
}

const muscles = {
"Chest" : 1,
"Forearms" : 2,
"Lats" : 3,
"Middle Back" : 4,
"Lower Back" : 5,
"Neck" : 6,
"Quadriceps" : 7,
"Hamstrings" : 8,
"Calves" : 9,
"Triceps" : 10,
"Traps" : 11,
"Shoulders" : 12,
"Abdominals" : 13,
"Glutes" : 14,
"Biceps" : 15,
"Adductors" : 16,
}



getNameTest();
