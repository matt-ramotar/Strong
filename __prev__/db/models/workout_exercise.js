'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workout_Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Workout_Exercise.init({
    workoutId: DataTypes.INTEGER,
    exerciseId: DataTypes.INTEGER,
    setId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Workout_Exercise',
  });
  return Workout_Exercise;
};