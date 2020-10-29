// SECTION producModel
const { ObjectId } = require('mongodb');
const connection = require('./connection');

/**
 * ANCHOR Add products
 *
 * @param name
 * @param quantity
 */
const addProduct = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  return result.ops[0]; // Retornar o objeto adicionado
};

/**
 * ANCHOR Find product by name
 *
 * @param name
 */
const findByName = async (name) => {
  return await connection().then((db) => db.collection('products').findOne({ name }));
};

/**
 * ANCHOR Find product by id
 *
 * @param id
 */
const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null; // Verifica se o Id é válido

  return await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

/**
 * ANCHOR Find All products
 */
const findAll = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

/**
 * ANCHOR Put
 *
 * produto que vai ser atualizado (ObjectId)
 * @param id
 * campos que serão atualizados
 * @param name
 * @param quantity
 */
const update = async (id, name, quantity) => {
  await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
};

/**
 * ANCHOR Delete
 *
 * @param id
 */
const removeProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null; // Verifica se o Id é válido
  await connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = { addProduct, findByName, findAll, findById, update, removeProduct };

// !SECTION
