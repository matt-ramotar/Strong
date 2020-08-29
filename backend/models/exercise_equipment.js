'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise_Equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Exercise_Equipment.init({
    exerciseId: DataTypes.INTEGER,
    equipmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Exercise_Equipment',
  });
  return Exercise_Equipment;
};