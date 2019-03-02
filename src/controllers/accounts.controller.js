const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUNDS } = require('../../credentials.json');

const model = 'accounts';

exports.getAllAccounts = app => async (req, res, next) => {
  const bookshelf = app.get('bookshelf');
  try {
    const Model = bookshelf.model('accounts');
    const record = await new Model().fetchAll();
    return res.json(record);
  } catch (error) {
    return next(error);
  }
};

exports.getAccount = app => async (req, res, next) => {
  const bookshelf = app.get('bookshelf');
  try {
    const Model = bookshelf.model(model);
    const record = await new Model({ id: req.params.account_id }).fetch();
    return res.json(record);
  } catch (error) {
    return next(error);
  }
};

exports.createAccount = app => async (req, res, next) => {
  const bookshelf = app.get('bookshelf');
  const form = req.body;
  const {
    email, password, ...restOfNewAccount
  } = form;
  try {
    const Account = bookshelf.model(model);
    let account = await new Account({ email }).fetch();
    if (account) return res.json({ message: 'This email address is already in use' });

    // bcrypt
    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    // Store hash in your password DB.
    account = await new Account({
      email,
      password: hash,
      ...restOfNewAccount,
    }).save();

    return res.json(account);
  } catch (error) {
    return next(error);
  }
};

exports.updateAccount = app => async (req, res, next) => {
  const bookshelf = app.get('bookshelf');
  try {
    const Model = bookshelf.model(model);
    const record = await new Model(req.body).save(req.body, { method: 'update' });
    return res.json(record);
  } catch (error) {
    return next(error);
  }
};
