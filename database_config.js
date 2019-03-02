exports.development = {
  client: 'postgresql',
  connection: {
    database: 'vetbase',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    user: process.env.POSTGRES_USER || 'docker',
    password: process.env.POSTGRES_PASSWORD || 'super1user2password',
    charset: 'UTF8_GENERAL_CI',
  },
};

exports.production = {
  client: 'postgresql',
  connection: {
    database: 'vetbase',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    user: process.env.POSTGRES_USER || 'docker',
    password: process.env.POSTGRES_PASSWORD || 'super1user2password',
    charset: 'UTF8_GENERAL_CI',
  },
};
