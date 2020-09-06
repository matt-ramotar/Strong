'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Exercises', 'instructions');
    await queryInterface.addColumn('Exercises', 'equipmentId', { type: Sequelize.INTEGER, references: { model: 'Equipment' } });
    await queryInterface.addColumn('Exercises', 'bbPageUrl', { type: Sequelize.STRING(255) });
    return;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Exercises', 'equipmentId');
    await queryInterface.removeColumn('Exercises', 'bbPageUrl');
    return;
  },
};
