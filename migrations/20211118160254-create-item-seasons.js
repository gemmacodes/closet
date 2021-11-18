'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ItemSeasons", {
      ItemId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Items",
          key: "id",
        },
        allowNull: false,
      },
      ColorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Seasons",
          key: "id",
        },
        allowNull: false,
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ItemSeasons");
  },
};
