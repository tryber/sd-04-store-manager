// SECTION salesModel
const { ObjectId } = require('mongodb');
const connection = require('./connection');

/**
 * ANCHOR Add sales
 *
 * @param productId
 * @param quantity
 */
const addSales = async (itensSold) => {
  const result = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return result.ops[0]; // Retornar o objeto adicionado
};

/**
 * ANCHOR Find All products
 */
const findAll = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

/**
 * ANCHOR Find product by id
 *
 * @param id
 */
const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null; // Verifica se o Id é válido

  return await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
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
const update = async (id, itensSold) => {
  // console.log(itensSold);
  await connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }),
  );
};

/**
 * ANCHOR Delete
 *
 * @param id
 */
const removeSales = async (id) => {
  if (!ObjectId.isValid(id)) return null; // Verifica se o Id é válido
  await connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = { addSales, findAll, findById, update, removeSales };

// !SECTION
