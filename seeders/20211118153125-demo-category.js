'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Categories', [
      {
      name: 'Bags',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Coats',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Dresses',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Hats',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Jackets',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Jeans',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Scarves',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Shoes',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Shirts',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Shorts',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Skirts',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Sweatshirts',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'T-shirts',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Trousers',
      isChecked: false,
      createdAt: new Date(),
      updatedAt: new Date()
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};