const connection = require('./connection');

const getAllProducts = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products.map(({ _id, name, quantity }) => ({ _id, name, quantity })))
    .catch((err) => {
      console.error(err);
      return process.exit(1);
    });

const findByName = async (name) => {
  console.log(name);

  try {
    const db = await connection();
    const products = await db.collection('products').findOne({ name });
    console.log(products);
    return products;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const insertProduct = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }))
    .catch((err) => console.error(err));

module.exports = { getAllProducts, insertProduct, findByName };
