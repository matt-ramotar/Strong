'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exercise_Type.hasMany(models.Exercise, { foreignKey: 'typeId' });
      // define association here
    }
  }
  Exercise_Type.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Exercise_Type',
    }
  );
  return Exercise_Type;
};
