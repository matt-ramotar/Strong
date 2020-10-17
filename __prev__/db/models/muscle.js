'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Muscle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Muscle.belongsToMany(models.Exercise, {
        through: models.Exercise_Muscle,
        foreignKey: 'muscleId',
        otherKey: 'exerciseId',
      });
    }
  }
  Muscle.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Muscle',
    }
  );
  return Muscle;
};
