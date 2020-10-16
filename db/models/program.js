'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Program.hasMany(models.Routine, { foreignKey: 'programId' });
    }
  }
  Program.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Program',
    }
  );
  return Program;
};