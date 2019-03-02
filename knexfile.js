const config = require('./database_config');

module.exports = {
  development: {
    client: config.development.client,
    connection: config.development.connection,
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client:  config.production.client,
    connection: config.production.connection,
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
