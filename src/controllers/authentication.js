
const jsonwebtoken = require('jsonwebtoken');
const { JWT } = require('../../config');

const accountsService = require('../service/accounts');

exports.login = app => async (req, res, next) => {
  const { passport } = app.get('passport');
  try {
    passport.authenticate('local', { session: false }, (error, account, info) => {
      if (error) return res.status(500).json(error);
      if (!account) return res.status(401).json(info);

      const { password, ...accountWithoutPassword } = account.toJSON();
      const exposedAccountData = {
        id: accountWithoutPassword.id,
        email: accountWithoutPassword.email,
        first_name: accountWithoutPassword.first_name,
        last_name: accountWithoutPassword.last_name,
      };

      const token = jsonwebtoken.sign({ id: accountWithoutPassword.id }, JWT.SECRET, {
        issuer: JWT.ISSUER,
        audience: JWT.AUDIENCE,
        expiresIn: JWT.EXPIRES_IN,
      });
      return res.json({ account: exposedAccountData, token });
    })(req, res, next);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.register = app => async (req, res) => {
  try {
    const account = await accountsService.create(app, req.body);
    return res.json(account);
  } catch (error) {
    return res.json({ message: error.message });
  }
};
