const fs = require('fs').promises;

const genSeeds = async () => {
  const json = await fs.readFile('../seeds/exercise_muscles.json');
  const data = JSON.parse(json);
};

genSeeds();
