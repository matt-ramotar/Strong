'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Sets', 'workoutId', {
      type: Sequelize.INTEGER,
      references: { model: 'Workouts' },
    });

    await queryInterface.addColumn('Sets', 'exerciseId', {
      type: Sequelize.INTEGER,
      references: { model: 'Exercises' },
    });

    return;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Sets', 'workoutId');
    await queryInterface.removeColumn('Sets', 'exerciseId');
    return;
  },
};
