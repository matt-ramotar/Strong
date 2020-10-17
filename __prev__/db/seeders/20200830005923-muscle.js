'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('ALTER SEQUENCE "Muscles_id_seq" RESTART WITH 1');
    return await queryInterface.bulkInsert('Muscles', [
      { name: 'Chest', createdAt: new Date(), updatedAt: new Date() },
      {
        name: 'Forearms',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: 'Lats', createdAt: new Date(), updatedAt: new Date() },
      {
        name: 'Middle Back',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lower Back',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: 'Neck', createdAt: new Date(), updatedAt: new Date() },
      {
        name: 'Quadriceps',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hamstrings',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: 'Calves', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Triceps', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Traps', createdAt: new Date(), updatedAt: new Date() },
      {
        name: 'Shoulders',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Abdominals',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: 'Glutes', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Biceps', createdAt: new Date(), updatedAt: new Date() },
      {
        name: 'Adductors',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Muscles', null, {});
  },
};
