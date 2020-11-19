const { ObjectId } = require('mongodb');
const connection = require('./connector');

const findByName = async (collection, name) => {
  const db = await connection();
  const results = await db.collection(collection).findOne({ name });
  return results;
};

const findAll = async (collection) => {
  const db = await connection();
  const results = await db.collection(collection).find({}).toArray();
  return results;
};

const createOne = async (collection, query) => {
  const db = await connection();
  const result = await db.collection(collection).insertOne(query);
  return result.ops[0];
};

const findById = async (collection, id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection(collection).findOne(ObjectId(id));
  return result;
};

const update = async (collection, id, query) => {
  const db = await connection();
  await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: query });
};

const remove = async (collection, id) => {
  const db = await connection();
  await db.collection(collection).deleteOne({ _id: ObjectId(id) });
};

const addSale = async (itensSold) => {
  const sales = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  const { insertedId: _id } = sales;
  const result = { _id, itensSold };
  return result;
};

const updateProduct = async (id, name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return result;
};

const updateQuantity = async (action, productId, quantity) => {
  const product = await findById('products', productId);
  if (!product) return;
  let newQuantity = 0;
  if (action === 'POST') {
    newQuantity = product.quantity - quantity;
  }
  if (action === 'DELETE') {
    newQuantity = product.quantity + quantity;
  }
  await updateProduct(productId, product.name, newQuantity);
};

const updateProductQuantity = async (action, itensSold) => {
  if (itensSold === {}) return;
  const promisses = itensSold.map(({ productId, quantity }) =>
    updateQuantity(action, productId, quantity));
  await Promise.all(promisses);
};

module.exports = {
  findByName,
  findAll,
  createOne,
  findById,
  update,
  remove,
  addSale,
  updateProductQuantity,
};
