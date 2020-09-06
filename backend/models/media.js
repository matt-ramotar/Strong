'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Media.hasOne(models.Media_Type, { foreignKey: 'typeId' });
      Media.hasOne(models.Exercise, { foreignKey: 'exerciseId' });
    }
  }
  Media.init(
    {
      path: DataTypes.TEXT,
      typeId: DataTypes.INTEGER,
      exerciseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Media',
    }
  );
  return Media;
};
