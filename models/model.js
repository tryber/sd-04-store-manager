const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getProductsOrSales = async (coll) =>
  connection().then((db) => db.collection(coll).find().toArray());

const getProductOrSaleById = async (id, coll) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection().then((db) => db.collection(coll).findOne(ObjectId(id)));
  return result;
};

const getProductByName = async (name) => {
  const product = await connection().then((db) => db.collection('products').findOne({ name }));
  return product;
};

const addProduct = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );

  return result.ops[0];
};

const addSale = async (products) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: products }),
  );

  return result.ops[0];
};

const updateProduct = async (id, name, quantity) => {
  if (!(await getProductOrSaleById(id, 'products'))) return false;
  await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return true;
};

const updateSale = async (id, productId, quantity) => {
  if (!(await getProductOrSaleById(id, 'sales'))) return false;
  await connection().then((db) =>
    db
      .collection('sales')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { 'itensSold.0.productId': productId, 'itensSold.0.quantity': quantity } },
      ),
  );
  return true;
};

const removeProductOrSale = async (id, coll) => {
  await connection().then((db) => db.collection(coll).deleteOne({ _id: ObjectId(id) }));
  return true;
};

module.exports = {
  getProductsOrSales,
  getProductOrSaleById,
  getProductByName,
  addProduct,
  addSale,
  updateProduct,
  updateSale,
  removeProductOrSale,
};
