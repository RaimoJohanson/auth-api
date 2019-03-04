
const model = 'accounts';
const accountsService = require('../service/accounts');

exports.fetchAll = app => async (req, res, next) => {
  const bookshelf = app.get('bookshelf');
  console.log(req.user);
  try {
    const Model = bookshelf.model('accounts');
    const record = await new Model().fetchAll();
    return res.json(record);
  } catch (error) {
    return next(error);
  }
};

exports.fetch = app => async (req, res, next) => {
  const bookshelf = app.get('bookshelf');
  try {
    const Model = bookshelf.model(model);
    const record = await new Model({ id: req.params.account_id }).fetch();
    return res.json(record);
  } catch (error) {
    return next(error);
  }
};

exports.create = app => async (req, res) => {
  try {
    const account = await accountsService.create(app, req.body);
    return res.json(account);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

exports.update = app => async (req, res, next) => {
  const bookshelf = app.get('bookshelf');
  try {
    const Model = bookshelf.model(model);
    const record = await new Model(req.body).save(req.body, { method: 'update' });
    return res.json(record);
  } catch (error) {
    return next(error);
  }
};
