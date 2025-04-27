const sequelize = require("../database/index.js");
const { Sequelize } = require("sequelize");

const Widget = sequelize.define(
  "Widget",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    dashboard_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "dashboard",
        key: "id",
      },
    },
    widget_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    }
  },
  {
    tableName: "widget",
    timestamps: true,
  }
);

module.exports = Widget;
