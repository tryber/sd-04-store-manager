const connection = require('./connections');
const { ObjectId } = require('mongodb');

const add = async (name, quantity) => {
  try {
    const result = await connection().then((db) =>
      db.collection('products').insertOne({ name, quantity }),
    );
    return result.ops[0];
  } catch (_e) {
    console.log('Model stop', _e);
  }
};

const getAllProducts = async () => {
  try {
    const products = await connection().then((db) => db.collection('products').find().toArray());
    return products;
  } catch (_e) {
    console.log('Model stop', _e);
  }
};

const getOneProductId = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const getOneProductName = async (name) => (
  connection().then((db) => db.collection('products').findOne({ name }))
);

const update = async (id, name, quantity) => {
  if (!getOneProductId(id)) return false;
  await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
};

const remove = async (id) => {
  if (!getOneProductId(id)) return false;
  await connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  return true;
};

module.exports = { add, getAllProducts, getOneProductId, getOneProductName, update, remove };
