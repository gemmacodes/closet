'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Colors', [
      {
      name: 'Beige',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Black',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Blue',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Brown',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Green',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Grey',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Orange',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Pink',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Purple',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Red',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'White',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Yellow',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Colors', null, {});
  }
};