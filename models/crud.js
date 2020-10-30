const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = (collection, document) =>
  connection()
    .then((db) => db.collection(collection).insertOne(document))
    .then((insertedDocument) => insertedDocument.ops[0]);

const readAll = (collection) =>
  connection().then((db) => db.collection(collection).find().toArray());

const readById = (collection, id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection(collection).findOne(ObjectId(id)));
};

const readByName = (collection, name) =>
  connection().then((db) => db.collection(collection).findOne({ name }));

const updateById = (collection, id, query) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) =>
    db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: query }),
  );
};

const deleteById = (collection, id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection(collection).deleteOne({ _id: ObjectId(id) }));
};


module.exports = { create, readAll, readById, readByName, updateById, deleteById };
