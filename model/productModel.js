const { ObjectId } = require('mongodb');
const connection = require('./connection');

const PRODUCT = 'products';

const getAll = async () => connection().then((db) => db.collection(PRODUCT).find().toArray());

const add = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection(PRODUCT).insertOne({ name, quantity }),
  );

  return result.ops[0];
};

const getByName = async (name) =>
  connection().then((db) => db.collection(PRODUCT).findOne({ name: `${name}` }, { name: 1 }));

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection(PRODUCT).findOne(ObjectId(id)));
};

const update = async (id, name, quantity) => {
  if (!(await getById(id))) return false;

  await connection().then((db) =>
    db.collection(PRODUCT).updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );

  return true;
};

const remove = async (id) => {
  if (!(await getById(id))) return false;

  const { value } = await connection().then((db) =>
    db.collection(PRODUCT).findOneAndDelete({ _id: ObjectId(id) }),
  );

  return value;
};

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  update,
  remove,
};
