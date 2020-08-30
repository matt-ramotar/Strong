const genSeedsForEquipment = () => {
  return [
    'Bands',
    'Foam Roll',
    'Barbell',
    'Kettlebells',
    'Body Only',
    'Machine',
    'Cable',
    'Medicine Ball',
    'Dumbbell',
    'None',
    'E-Z Curl Bar',
    'Other',
    'Exercise Ball',
  ].reduce((acc, ele) => {
    acc.push({ name: ele, createdAt: 'new Date()', updatedAt: 'new Date()' });
    return acc;
  }, []);
};

console.log(genSeedsForEquipment());
