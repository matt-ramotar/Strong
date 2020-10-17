'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('ALTER SEQUENCE "Exercise_Types_id_seq" RESTART WITH 1');
    return await queryInterface.bulkInsert('Exercise_Types', [
      { type: 'Cardio', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Olympic Weightlifting', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Plyometrics', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Powerlifting', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Strength', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Stretching', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Strongman', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Exercise_Types', null, {});
  },
};
