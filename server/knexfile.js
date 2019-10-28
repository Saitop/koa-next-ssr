require("./lib/bootstrap");
/* eslint no-console:0 */
const path = require("path");
const config = require("config");
const fs = require("fs");

const dbClient = process.env.DB_CLIENT
  ? process.env.DB_CLIENT
  : config.get("db.client");
console.log("db client: ", dbClient);
const dbConnection = process.env.DB_CONNECTION
  ? process.env.DB_CONNECTION
  : config.get("db.connection");
console.log("db connection: ", dbConnection);

if (dbClient === "sqlite3") {
  try {
    fs.mkdirSync("data");
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
}
const options = {
  client: dbClient,
  connection: dbConnection || {
    filename: "data/dev.sqlite3",
  },
  migrations: {
    directory: path.resolve(__dirname, "migrations"),
    tableName: "migrations",
  },
  debug: false,
  seeds: {
    directory: path.resolve(__dirname, "seeds"),
  },
  useNullAsDefault: dbClient === "sqlite3",
};

if (dbClient !== "sqlite3") {
  options.pool = {
    min: 1,
    max: 10,
  };
}

const configs = {
  development: Object.assign({}, options),

  test: Object.assign({}, options, {
    connection: dbConnection || {
      filename: "data/test.sqlite3",
    },
  }),

  production: Object.assign({}, options, {
    connection: dbConnection || {
      filename: "data/prod.sqlite3",
    },
  }),
};

Object.assign(configs, configs[process.env.NODE_ENV]);

console.log("Env: ", process.env.NODE_ENV);
console.log("config", configs[process.env.NODE_ENV]);

module.exports = configs;
