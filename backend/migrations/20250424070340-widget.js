"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create 'widget' table
    await queryInterface.createTable("widget", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      dashboard_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "dashboard", // Foreign key referencing 'dashboard' table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      widget_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
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
    // Drop 'widget' table
    await queryInterface.dropTable("widget");
  },
};
