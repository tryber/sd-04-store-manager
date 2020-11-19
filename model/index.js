const create = require('./create');
const remove = require('./delete');
const read = require('./read');
const update = require('./update');

module.exports = {
  create,
  read,
  update,
  delete: remove,
};
