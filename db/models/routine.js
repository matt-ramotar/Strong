'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Routine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Routine.belongsTo(models.Program, { foreignKey: 'programId' });
      Routine.hasMany(models.Workout, { foreignKey: 'routineId' });
    }
  }
  Routine.init(
    {
      programId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Routine',
    }
  );
  return Routine;
};
