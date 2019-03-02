const bcrypt = require('bcrypt');

const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const credentials = require('../credentials.json');

const MESSAGES = {
  incorrect_email_or_password: 'Incorrect email or password',
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: credentials.JWT_SECRET,
  issuer: credentials.JWT_ISSUER,
  audience: credentials.JWT_AUDIENCE,
};

module.exports = (app, passport) => {
  const Account = app.get('bookshelf').model('accounts');

  passport.use(new JwtStrategy(opts, async (payload, done) => {
    if (!payload.id) return done('Token is missing account id');
    return done(null, payload);
  }));

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const account = await new Account({ email }).fetch();
      if (!account) return done(null, false, { message: MESSAGES.incorrect_email_or_password });

      const match = await bcrypt.compare(password, account.get('password'));
      if (!match) return done(null, false, { message: MESSAGES.incorrect_email_or_password });

      return done(null, account);
    } catch (error) {
      return done(error);
    }
  }));

  return {
    passport,
    checkAuthentication: (req, res, next) => passport.authenticate('jwt', { session: false }, (error, account) => {
      if (error) return res.status(500).json({ message: error });
      if (!account) return res.status(401).json({ message: 'Missing token' });
      req.user = account;
      return next();
    })(req, res, next),
  };
};
