const { ObjectId } = require('mongodb');
const connection = require('../models/connection');

/**
 * Este arquivo é uma refatoração
 * das funções que podem ser usadas tanto
 * na model productModel quanto na salesModel
 */

/**
 * ANCHOR Delete
 *
 * @param id
 * @param collection
 */
const remove = async (id, collection) => {
  if (!ObjectId.isValid(id)) return null; // Verifica se o Id é válido
  await connection().then((db) => db.collection(collection).deleteOne({ _id: ObjectId(id) }));
};

/**
 * ANCHOR Find All products
 */
const findAll = async (collection) => 
  await connection().then((db) => db.collection(collection).find().toArray());

/**
 * ANCHOR Find product by id
 *
 * @param id
 */
const findById = async (id, collection) => {
  if (!ObjectId.isValid(id)) return null; // Verifica se o Id é válido

  return connection().then((db) => db.collection(collection).findOne(ObjectId(id)));
};

module.exports = { remove, findAll, findById };
