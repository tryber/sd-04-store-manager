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

module.exports = { addSales, update };

// !SECTION
