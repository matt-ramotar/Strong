'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise_Muscle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Exercise_Muscle.init({
    exerciseId: DataTypes.INTEGER,
    muscleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Exercise_Muscle',
  });
  return Exercise_Muscle;
};