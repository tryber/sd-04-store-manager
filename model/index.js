const create = require('./create');
const remove = require('./delete');
const read = require('./read');
const update = require('./update');

module.exports = {
  create,
  delete: remove,
  read: read.findBy,
  update,
};
