'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      equipmentId: {
        type: Sequelize.INTEGER,
        references: { model: 'Equipment' },
      },
      bbPageUrl: {
        type: Sequelize.STRING(255),
      },
      typeId: {
        type: Sequelize.INTEGER,
        references: { model: 'Exercise_Types' },
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
    await queryInterface.dropTable('Exercises');
  },
};