const sequelize = require("../database/index.js");
const { Sequelize } = require("sequelize");

const Dashboard = sequelize.define(
  "Dashboard",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
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
  },
  {
    tableName: "dashboard",
    timestamps: true,
  }
);

module.exports = Dashboard;
