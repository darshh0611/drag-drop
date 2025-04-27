const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    timezone: "+05:30",
    logging: (sql) => console.info(sql),
    pool: {
      min: process.env.MIN_POOL_SIZE || 1,
      max: process.env.MAX_POOL_SIZE || 50,
      maxUses: process.env.MAX_POOL_USER || 50,
    },
    // define: {
    //   createdAt: "created_at",
    //   updatedAt: "updated_at",
    // },
  }
);

module.exports = sequelize;
