'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reps: {
        type: Sequelize.INTEGER,
      },
      pounds: {
        type: Sequelize.INTEGER,
      },
      workoutId: {
        type: Sequelize.INTEGER,
        references: { model: 'Workouts' },
      },
      exerciseId: {
        type: Sequelize.INTEGER,
        references: { model: 'Exercises' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sets');
  },
};
