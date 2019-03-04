const router = require('express').Router();
const accounts = require('./controllers/accounts');
const authentication = require('./controllers/authentication');

const ROUTE = '/api';

module.exports = (app) => {
  const { checkAuthentication } = app.get('passport');

  router.route('/login')
    .post(authentication.login(app));

  router.route('/register')
    .post(authentication.register(app));

  router.route('/').get((req, res) => {
    res.json('API root');
  });

  router.route('/accounts')
    .get(checkAuthentication, /* checkAuthorization, */ accounts.fetchAll(app))
    .post(checkAuthentication, /* checkAuthorization, */ accounts.create(app));

  router.route('/accounts/:account_id')
    .get(checkAuthentication, /* checkAuthorization, */ accounts.fetch(app))
    .put(checkAuthentication, /* checkAuthorization, */ accounts.update(app));

  app.use(ROUTE, router);
};
