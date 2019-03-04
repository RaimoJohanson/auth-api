const { DATABASE } = require('./config');

module.exports = {
  client: DATABASE.CLIENT,
  connection: {
    database: DATABASE.NAME,
    host: DATABASE.HOST,
    port: DATABASE.PORT,
    user: DATABASE.USER,
    password: DATABASE.PASSWORD,
    charset: DATABASE.CHARSET,
  },
};
