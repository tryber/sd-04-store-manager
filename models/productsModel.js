const Boom = require('@hapi/boom');
const Joi = require('joi');
const { ObjectId } = require('mongodb');
const { getById } = require('.');
const connection = require('./connection');

const schema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
}).unknown(false);

const getByName = (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const validateProduct = async (info, searchOnDB) => {
  const { error: { message } = {} } = schema.validate(info, { convert: false });
  if (message) return message.replace('greater', 'larger');

  if (searchOnDB) {
    const product = await getByName(info.name);
    if (product) return 'Product already exists';
  }
};

const updateQuantity = async (id, number) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong id format');
  const product = await getById('products', id);
  if (product && product.quantity + number <= 0) throw Boom.notFound('Such amount is not permitted to sell', { code: 'stock_problem' });
  return connection().then(
    (db) => db
      .collection('products').updateOne({ _id: ObjectId(id) }, { $inc: { quantity: number } }),
  );
};

module.exports = {
  getByName, validateProduct, updateQuantity,
};
