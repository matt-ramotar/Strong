const fs = require('fs').promises;

const getData = async () => {
  const exerciseIdsJson = await fs.readFile('../seeds/exerciseIds.json');
  const muscleIdsJson = await fs.readFile('../seeds/muscleIds.json');
  const exercise_musclesJson = await fs.readFile('../seeds/exercise_muscles--names.json');

  const exerciseIds = await JSON.parse(exerciseIdsJson);
  const muscleIds = await JSON.parse(muscleIdsJson);
  const exercise_muscles = await JSON.parse(exercise_musclesJson);

  const exerciseIdsMap = new Map(await exerciseIds);
  const muscleIdsMap = new Map(await muscleIds);

  return { exerciseIdsMap, muscleIdsMap, exercise_muscles };
};

const mapExercise_Muscles = async () => {
  const exercise_musclesSet = new Set();
  const { exerciseIdsMap, muscleIdsMap, exercise_muscles } = await getData();

  for (item of exercise_muscles) {
    let exerciseId = await exerciseIdsMap.get(item.exercise);
    let muscleId = await muscleIdsMap.get(item.muscle);
    exercise_musclesSet.add({ exerciseId, muscleId, createdAt: 'new Date()', updatedAt: 'new Date()' });
  }
  await fs.writeFile('../seeds/exercise_muscles.json', JSON.stringify(Array.from(exercise_musclesSet)));
};

mapExercise_Muscles();
