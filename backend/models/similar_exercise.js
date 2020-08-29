'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Similar_Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Similar_Exercise.init({
    exerciseId: DataTypes.INTEGER,
    similarExerciseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Similar_Exercise',
  });
  return Similar_Exercise;
};