
const jwt = require('jsonwebtoken');
// const passport = require('../passport');
const { JWT_SECRET, JWT_AUDIENCE, JWT_ISSUER } = require('../../credentials.json');

exports.getToken = app => async (req, res, next) => {
  const { passport } = app.get('passport');
  passport.authenticate('local', { session: false }, (error, account, info) => {
    if (error) return next(error);
    if (!account) return res.json(info);

    return req.login(account, { session: false }, (err) => {
      if (err) return next(err);
      const { password, ...accountWithoutPassword } = account.toJSON();
      const exposedAccountData = {
        id: accountWithoutPassword.id,
        email: accountWithoutPassword.email,
        first_name: accountWithoutPassword.first_name,
        last_name: accountWithoutPassword.last_name,
      };

      const token = jwt.sign(exposedAccountData, JWT_SECRET, {
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
        expiresIn: '24h',
      });
      return res.json({
        account: exposedAccountData,
        token,
      });
    });
  })(req, res, next);
};
