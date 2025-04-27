const Dashboard = require("./dashboard");
const Widget = require("./widget");

Dashboard.hasMany(Widget, {
  foreignKey: "dashboard_id",
  as: "widget",
  onDelete: "CASCADE",
});

Widget.belongsTo(Dashboard, { foreignKey: "dashboard_id", as: "dashboard" });

module.exports = {
  Dashboard,
  Widget,
};
