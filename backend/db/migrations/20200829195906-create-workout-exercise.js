'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Workout_Exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      setId: {
        type: Sequelize.INTEGER,
        references: { model: 'Sets' },
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
    await queryInterface.dropTable('Workout_Exercises');
  },
};
