'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instruction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Instruction.hasOne(models.Exercise, { foreignKey: 'exerciseId' });
    }
  }
  Instruction.init(
    {
      instruction: DataTypes.TEXT,
      exerciseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Instruction',
    }
  );
  return Instruction;
};
