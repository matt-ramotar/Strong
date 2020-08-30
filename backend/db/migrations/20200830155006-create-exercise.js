'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('Exercises', 'equipmentId', {
      type: Sequelize.INTEGER,
      references: { model: 'Equipment' },
    });
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropColumn('Exercises', 'equipmentId');
  },
};
