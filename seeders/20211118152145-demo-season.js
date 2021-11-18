'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Seasons', [
      {
      name: 'Spring',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Summer',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Fall',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Winter',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Seasons', null, {});
  }
};
