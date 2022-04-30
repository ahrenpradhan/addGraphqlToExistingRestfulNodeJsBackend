require("dotenv").config();

const config = {
  development: {
    username: process.env.DB2_USER,
    password: process.env.DB2_PASS,
    database: process.env.DB2_DB,
    host: process.env.DB2_HOST,
    port: process.env.DB2_PORT,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB2_USER,
    password: process.env.DB2_PASS,
    database: process.env.DB2_DB,
    host: process.env.DB2_HOST,
    port: process.env.DB2_PORT,
    dialect: "mysql",
    logging: false,
  },
};

module.exports = {
  ...config,
};
