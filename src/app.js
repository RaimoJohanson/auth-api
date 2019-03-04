
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');

const bookshelf = require('./bookshelf');
// const errorHandler = require('./_helpers/errorhandler');

module.exports = (app) => {
  app.set('bookshelf', bookshelf);

  app.set('passport', require('./passport')(app, passport)); // eslint-disable-line

  app.use(passport.initialize());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`); // eslint-disable-line
      next();
    });
  }

  const ROUTER = `${__dirname}/router`;
  require(ROUTER)(app); // eslint-disable-line

  app.use((req, res) => {
    res.status(404).json({
      error: {
        message: 'Route not found',
        code: 404,
      },
      request: {
        method: req.method,
        url: req.url,
      },
    });
  });
};
