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
const findByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

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

module.exports = { addProduct, findByName, update };

// !SECTION
