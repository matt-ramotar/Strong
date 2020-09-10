'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exercise.belongsTo(models.Exercise_Type, { foreignKey: 'typeId' });
      Exercise.belongsTo(models.Equipment, { foreignKey: 'equipmentId' });
      Exercise.belongsToMany(models.Muscle, {
        through: models.Exercise_Muscle,
        foreignKey: 'exerciseId',
        otherKey: 'muscleId',
      });
      Exercise.belongsToMany(models.Workout, {
        through: models['Set'],
        foreignKey: 'exerciseId',
        otherKey: 'workoutId',
      });
      Exercise.hasMany(models.Media, { foreignKey: 'exerciseId' });
      Exercise.hasMany(models.Instruction, { foreignKey: 'exerciseId' });
    }
  }
  Exercise.init(
    {
      name: DataTypes.STRING,
      equipmentId: DataTypes.INTEGER,
      bbPageUrl: DataTypes.STRING,
      typeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Exercise',
    }
  );
  return Exercise;
};
