"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create 'dashboard' table
    await queryInterface.createTable("dashboard", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      layouts: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: { lg: [], md: [], sm: [] },
      },
      nextId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop 'dashboard' table
    await queryInterface.dropTable("dashboard");
  },
};
