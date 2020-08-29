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
      Exercise.hasOne(models.Exercise_Type, { foreignKey: 'typeId' });
      Exercise.hasOne(models.Equipment, { foreignKey: 'equipmentId' });
      Exercise.hasMany(models.Exercise, {
        through: models.Similar_Exercise,
        foreignKey: 'exerciseId',
        otherKey: 'similarExerciseId',
      });
      Exercise.hasMany(models.Muscle, {
        through: models.Exercise_Muscle,
        foreignKey: 'exerciseId',
        otherKey: 'muscleId',
      });
      Exercise.belongsTo(models.Workout_Exercise, { foreignKey: 'exerciseId' });
    }
  }
  Exercise.init(
    {
      name: DataTypes.STRING,
      instructions: DataTypes.TEXT,
      typeId: DataTypes.INTEGER,
      equipmentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Exercise',
    }
  );
  return Exercise;
};
