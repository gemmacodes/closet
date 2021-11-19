'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Items', [
      {
      name: 'Bags',
      image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1540837691-260347_2772_41.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      CategoryId:3
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
