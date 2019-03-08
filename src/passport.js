const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT, SECURITY } = require('../config');

const MESSAGES = {
  incorrect_email_or_password: 'Incorrect email or password',
  token_missing_account_id: 'Token is missing account id',
  missing_token: 'Token is missing',
  invalid_token: 'Invalid token',
};

const JWT_OPTIONS = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT.SECRET,
  issuer: JWT.ISSUER,
  audience: JWT.AUDIENCE,
};

module.exports = (app, passport) => {
  const Account = app.get('bookshelf').model('accounts');

  passport.use(new JwtStrategy(JWT_OPTIONS, async (jwtPayload, done) => {
    if (!jwtPayload.id) return done(MESSAGES.token_missing_account_id);
    return done(null, new Account({ id: jwtPayload.id }));
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
      if (error) return res.status(400).json({ message: error });
      if (!account) return res.status(401).json({ message: MESSAGES.invalid_token });
      req.user = account;
      return next();
    })(req, res, next),
    hashPlaintextPassword: plaintext => bcrypt.hash(plaintext, SECURITY.SALT_ROUNDS),
  };
};
