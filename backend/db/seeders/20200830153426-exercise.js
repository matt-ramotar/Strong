'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('ALTER SEQUENCE "Exercises_id_seq" RESTART WITH 1');
    return await queryInterface.bulkInsert('Exercises', [
      {
        name: 'Dumbbell Bench Press',
        instructions: '/exercises/dumbbell-bench-press',
        equipmentId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pushups',
        instructions: '/exercises/pushups',
        equipmentId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Close-grip bench press',
        instructions: '/exercises/close-grip-barbell-bench-press',
        equipmentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dumbbell Flyes',
        instructions: '/exercises/dumbbell-flyes',
        equipmentId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Incline dumbbell bench press',
        instructions: '/exercises/incline-dumbbell-press',
        equipmentId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Low-cable cross-over',
        instructions: '/exercises/low-cable-crossover',
        equipmentId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Barbell Bench Press - Medium Grip',
        instructions: '/exercises/barbell-bench-press-medium-grip',
        equipmentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chest dip',
        instructions: '/exercises/dips-chest-version',
        equipmentId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Decline Dumbbell Flyes',
        instructions: '/exercises/decline-dumbbell-flyes',
        equipmentId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bodyweight Flyes',
        instructions: '/exercises/bodyweight-flyes',
        equipmentId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Incline cable chest fly',
        instructions: '/exercises/incline-cable-flye',
        equipmentId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Decline barbell bench press',
        instructions: '/exercises/decline-barbell-bench-press',
        equipmentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Wide-grip bench press',
        instructions: '/exercises/wide-grip-barbell-bench-press',
        equipmentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Wide-Grip Decline Barbell Bench Press',
        instructions: '/exercises/wide-grip-decline-barbell-bench-press',
        equipmentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Reverse-grip incline dumbbell bench press',
        instructions: '/exercises/incline-dumbbell-press-reverse-grip',
        equipmentId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Exercises', null, {});
  },
};
