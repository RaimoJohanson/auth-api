module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || '3010',
  SECURITY: {
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  },
  DATABASE: {
    CLIENT: process.env.DATABASE_CLIENT || 'postgresql',
    NAME: process.env.DATABASE_NAME || 'vetbase',
    HOST: process.env.DATABASE_HOST || 'localhost',
    PORT: process.env.DATABASE_PORT || 5432,
    USER: process.env.DATABASE_USER || 'docker',
    PASSWORD: process.env.DATABASE_PASSWORD || 'super1user2password',
    CHARSET: process.env.DATABASE_CHARSET || 'UTF8_GENERAL_CI',
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || 'd4dde36d5b7717d7cfb2777e4dd6fe0f',
    ISSUER: process.env.JWT_ISSUER || 'accounts.gatey.ee',
    AUDIENCE: process.env.JWT_AUDIENCE || 'gatey.ee',
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '9999h',
  },
};
