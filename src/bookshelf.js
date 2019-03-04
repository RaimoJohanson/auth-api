const fs = require('fs');
const path = require('path');
const { NODE_ENV } = require('../config');

const config = require('../knexfile'); // eslint-disable-line

const knex = require('knex')(config[NODE_ENV]); // eslint-disable-line
const bookshelf = require('bookshelf')(knex); // eslint-disable-line

bookshelf.plugin('registry');
bookshelf.plugin('pagination');

const MODELS_DIR = `${__dirname}/models/`;

fs.readdirSync(MODELS_DIR)
  .filter(file => path.extname(file) === '.js' && !file.match(/^_/))
  .forEach((file) => {
    const name = path.basename(file).split('.')[0];
    const model = require(MODELS_DIR + file)(bookshelf, name); // eslint-disable-line
    bookshelf.model(name, model);
  });

module.exports = bookshelf;
