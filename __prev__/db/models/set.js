'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Set extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Set.init(
    {
      reps: DataTypes.INTEGER,
      pounds: DataTypes.INTEGER,
      workoutId: DataTypes.INTEGER,
      exerciseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Set',
    }
  );
  return Set;
};
