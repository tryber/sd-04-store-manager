const connection = require('./connection');

const getAllProducts = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products.map(({ _id, name, quantity }) => ({ _id, name, quantity })))
    .catch((err) => console.error(err));

const findByName = async (nameParam) => {
  try {
    const db = await connection();
    const products = await db.collection('products').find({ name: nameParam });
    return products;
  } catch (err) {
    console.error(err);
  }
};

const insertProduct = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => {
      return { id: result.insertedId, name, quantity };
    })
    .catch((err) => console.error(err));

module.exports = { getAllProducts, insertProduct, findByName };
