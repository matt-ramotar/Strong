'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('Workouts', 'programId', {
      type: Sequelize.INTEGER,
      references: { model: 'Programs' },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('Workouts', 'programId');
  },
};
