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

const updateProduct = (id, info) => {
  if (!ObjectId.isValid(id)) return Promise.reject(new Error('Wrong id format'));
  return connection()
    .then((db) => db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: info }));
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return Promise.reject(new Error('Wrong id format'));
  const product = await getById(id);
  const { deletedCount } = await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

  return deletedCount ? product : Promise.reject(new Error('Wrong id format'));
};

const validateProduct = async (info, searchInDB = true) => {
  const { error: { message } = {} } = schema.validate(info, { convert: false });
  if (message) return message.replace('greater', 'larger');

  if (searchInDB) {
    const product = await getByName(info.name);
    if (product) return 'Product already exists';
  }
};

module.exports = {
  getByName, addNewProduct, validateProduct, getAll, getById, updateProduct, deleteProduct,
};
