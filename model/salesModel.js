const { ObjectId } = require('mongodb');
const connection = require('./connection');

const SALES = 'sales';

const adicionar = async (itensSold) => {
  const result = await connection().then((db) => db.collection(SALES).insertOne({ itensSold }));

  return result.ops[0];
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error();
  return connection().then((db) => db.collection(SALES).findOne(ObjectId(id)));
};

const getAll = async () => connection().then((db) => db.collection(SALES).find().toArray());

const update = async (id, itensSold) => {
  if (!(await getById(id))) return false;

  await connection().then((db) =>
    db.collection(SALES).updateMany({ _id: ObjectId(id) }, { $set: { itensSold } }),
  );

  return true;
};

const remove = async (id) => {
  if (!(await getById(id))) throw new Error();

  const { value } = await connection().then((db) =>
    db.collection(SALES).findOneAndDelete({ _id: ObjectId(id) }),
  );

  return value;
};

module.exports = {
  remove,
  update,
  getAll,
  getById,
  adicionar,
};
