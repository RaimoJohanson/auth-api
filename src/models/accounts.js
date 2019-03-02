module.exports = (bookshelf, tableName) => bookshelf.Model.extend({
  tableName,
  hasTimestamps: true,
}, {});
