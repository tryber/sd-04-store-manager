const Joi = require('joi');
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const schema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const getByName = (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const getAll = () => connection()
  .then((db) => db.collection('products').find().toArray());

const getById = (id) => {
  if (!ObjectId.isValid(id)) return Promise.reject(new Error('Wrong id format'));
  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const addNewProduct = (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then(((result) => result.ops[0]));

const validateProduct = async (info) => {
  const { error: { message } = {} } = schema.validate(info, { convert: false });
  if (message) return message.replace('greater', 'larger');

  const product = await getByName(info.name);
  if (product) return 'Product already exists';
};

module.exports = { getByName, addNewProduct, validateProduct, getAll, getById };
