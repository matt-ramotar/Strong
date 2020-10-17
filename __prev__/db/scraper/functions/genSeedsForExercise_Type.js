const genSeedsForExercise_Type = () => {
  return ['Cardio', 'Olympic Weightlifting', 'Plyometrics', 'Powerlifting', 'Strength', 'Stretching', 'Strongman'].reduce((acc, ele) => {
    acc.push({ type: ele, createdAt: new Date(), updatedAt: new Date() });
    return acc;
  }, []);
};

console.log(genSeedsForExercise_Type());
