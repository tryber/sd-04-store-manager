const connection = require('./connection');
const { ObjectId } = require('mongodb');

const cadastro = async (data, type) => {
  let result = '';
  const db = await connection();
  if (type === 'prod') {
    result = await db.collection('products').insertOne(data);
  } else {
    result = await db.collection('sales').insertOne(data);
  }

  return result.ops[0];
};

const findByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

const findById = async (id, type) => {
  if (!ObjectId.isValid(id)) return null;
  if (type === 'prod') {
    return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
  }
  return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const findAll = async (type) => {
  if (type === 'prod') {
    return connection().then((db) => db.collection('products').find().toArray());
  }
  return connection().then((db) => db.collection('sales').find().toArray());
};

const atualizacao = async (id, name, quantity) => {
  const product = await findById(id);

  if (!product) return null;

  await connection().then((db) => db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  const newProduct = await findById(id);
  return newProduct;
};

const deletar = async (id, type) => {
  let result = {};
  if (type === 'prod') {
    result = await findById(id, 'prod');
    connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  } else {
    result = await findById(id);
    connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  }
  if (!result) return null;
  return result;
};

module.exports = {
  cadastro,
  findByName,
  findAll,
  findById,
  atualizacao,
  deletar,
};
