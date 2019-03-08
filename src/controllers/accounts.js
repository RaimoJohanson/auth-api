const accountsService = require('../service/accounts');

exports.fetchAll = app => async (req, res) => {
  const bookshelf = app.get('bookshelf');
  try {
    const Model = bookshelf.model('accounts');
    const record = await new Model().fetchAll();
    return res.json(record);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

exports.fetch = app => async (req, res) => {
  const bookshelf = app.get('bookshelf');
  try {
    const Model = bookshelf.model('accounts');
    const record = await new Model({ id: req.params.account_id }).fetch();
    return res.json(record);
  } catch (error) {
    return res.json({ message: error.message });
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

exports.update = app => async (req, res) => {
  try {
    const bookshelf = app.get('bookshelf');
    const id = req.params.account_id;
    const Model = bookshelf.model('accounts');
    const record = await new Model({ id }).fetch();
    if (record) {
      const result = await record.set({ updated_at: Date.now() }).save(req.body);
      return res.json(result);
    }
    return res.json({ message: 'Account not found' });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
