const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerSales = async (itensSold) => {
  try {
    const db = await connection();
    const sales = await db.collection('sales').insertOne({ itensSold });

    return sales.ops[0];
  } catch (err) {
    console.error('registerSales', err);
  }
};

const getAllSales = async () => {
  try {
    const db = await connection();
    const getSales = await db.collection('sales').find({}).toArray();
    return getSales;
  } catch (err) {
    console.error('getAllSales', err);
  }
};

const getSaleById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) return null;

    const db = await connection();
    const getSale = await db.collection('sales').findOne(ObjectId(id));

    return getSale;
  } catch (err) {
    console.error('getSaleById', err);
  }
};

const updateSale = async (id, sale) => {
  try {
    const [{ ...product }] = sale;
    const idProd = product.productId;
    const qntProd = product.quantity;

    const db = await connection();
    await db
      .collection('sales')
      .updateOne(
        { _id: ObjectId(id), 'itensSold.productId': idProd },
        { $set: { 'itensSold.0.quantity': qntProd } },
      );
  } catch (err) {
    console.error('getSaleById', err);
  }
};

module.exports = { registerSales, getAllSales, getSaleById, updateSale };
