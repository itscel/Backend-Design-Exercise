require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      decimalNumbers: true,
      timezone: process.env.DB_TIMEZONE,
    },
    replication: {
      read: { port: process.env.DB_REPLICA_PORT },
      write: { port: process.env.DB_PORT },
    },
    timezone: process.env.DB_TIMEZONE,
    logging: process.env.DB_DEBUG === 'true',
  },
  staging: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      decimalNumbers: true,
      timezone: process.env.DB_TIMEZONE,
    },
    replication: {
      read: { port: process.env.DB_REPLICA_PORT },
      write: { port: process.env.DB_PORT },
    },
    timezone: process.env.DB_TIMEZONE,
    logging: process.env.DB_DEBUG === 'true',
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      decimalNumbers: true,
      timezone: process.env.DB_TIMEZONE,
    },
    replication: {
      read: { port: process.env.DB_REPLICA_PORT },
      write: { port: process.env.DB_PORT },
    },
    timezone: process.env.DB_TIMEZONE,
    logging: console.log,
    pool: {
      max: 250,
      min: 0,
      idle: 5000,
      acquire: 60000,
    },
  },
}
