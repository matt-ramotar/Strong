'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Workout.belongsToMany(models.Exercise, {
        through: models.Workout_Exercise,
        foreignKey: 'workoutId',
        otherKey: 'exerciseId',
      });
      Workout.belongsTo(models.Program, { foreignKey: 'workoutId' });
    }
  }
  Workout.init(
    {
      start: DataTypes.DATE,
      end: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Workout',
    }
  );
  return Workout;
};
