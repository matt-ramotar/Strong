'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Media_Type.belongsTo(models.Media, { foreignKey: 'typeId' });
    }
  }
  Media_Type.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Media_Type',
    }
  );
  return Media_Type;
};
