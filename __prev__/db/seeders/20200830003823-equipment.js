'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('ALTER SEQUENCE "Equipment_id_seq" RESTART WITH 1');
    return await queryInterface.bulkInsert('Equipment', [
      { name: 'Bands', createdAt: new Date(), updatedAt: new Date() },
      {
        name: 'Foam Roll',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: 'Barbell', createdAt: new Date(), updatedAt: new Date() },
      {
        name: 'Kettlebells',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Body Only',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: 'Machine', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cable', createdAt: new Date(), updatedAt: new Date() },
      {
        name: 'Medicine Ball',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dumbbell',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: 'None', createdAt: new Date(), updatedAt: new Date() },
      {
        name: 'E-Z Curl Bar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: 'Other', createdAt: new Date(), updatedAt: new Date() },
      {
        name: 'Exercise Ball',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Equipment', null, {});
  },
};
