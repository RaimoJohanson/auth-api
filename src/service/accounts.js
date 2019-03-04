
exports.create = async (app, form) => {
  const bookshelf = app.get('bookshelf');
  const { hashPlaintextPassword } = app.get('passport');
  const { email, password, ...restOfNewAccount } = form;
  try {
    const Account = bookshelf.model('accounts');

    let account = await new Account({ email }).fetch();

    if (account) throw new Error('This email address is already in use');

    const hash = await hashPlaintextPassword(password);

    account = await new Account({ email, password: hash, ...restOfNewAccount }).save();

    return Promise.resolve(account);
  } catch (error) {
    return Promise.reject(error);
  }
};
