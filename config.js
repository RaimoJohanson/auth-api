module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  SECURITY: {
    SALT_ROUNDS: process.env.SALT_ROUNDS,
  },
  DATABASE: {
    CLIENT: process.env.DATABASE_CLIENT,
    NAME: process.env.DATABASE_NAME,
    HOST: process.env.DATABASE_HOST,
    PORT: process.env.DATABASE_PORT,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    CHARSET: process.env.DATABASE_CHARSET,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    ISSUER: process.env.JWT_ISSUER,
    AUDIENCE: process.env.JWT_AUDIENCE,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  },
};
