const router = require('express').Router();
const accounts = require('./controllers/accounts.controller');
const login = require('./controllers/login.controller');

const ROUTE = '/api';

module.exports = (app) => {
  const { checkAuthentication } = app.get('passport');

  router.route('/login')
    .post(login.getToken(app));

  router.route('/register')
    .post(accounts.createAccount(app));

  router.route('/accounts')
    .get(checkAuthentication, /* checkAuthorization, */ accounts.getAllAccounts(app))
    .post(checkAuthentication, /* checkAuthorization, */ accounts.createAccount(app));

  router.route('/accounts/:account_id')
    .get(checkAuthentication, /* checkAuthorization, */ accounts.getAccount(app))
    .put(checkAuthentication, /* checkAuthorization, */ accounts.updateAccount(app));

  app.use(ROUTE, router);
};
