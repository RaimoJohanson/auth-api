const databaseConfig = require('./database_config');

module.exports = {
  development: {
    client: databaseConfig.client,
    connection: databaseConfig.connection,
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: databaseConfig.client,
    connection: databaseConfig.connection,
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
