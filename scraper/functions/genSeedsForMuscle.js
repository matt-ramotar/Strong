const genSeedsForMuscle = () => {
  return [
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
    'Abductors',
  ].reduce((acc, ele) => {
    acc.push({ name: ele, createdAt: 'new Date()', updatedAt: 'new Date()' });
    return acc;
  }, []);
};

console.log(genSeedsForMuscle());
