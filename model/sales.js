const { ObjectId } = require('mongodb');
const connection = require('../helpers/connection');

const create = async (sale) => {
  try {
    const saleId = await connection().then((schema) =>
      schema.collection('sales').insertOne(sale),
    );

    return saleId.insertedId;
  } catch (error) {
    return error;
  }
};

const sales = async () =>
  connection().then((schema) => schema.collection('sales').find({}).toArray());

const sale = async () =>
  connection(id).then((schema) => schema.collection('sales').find({}).toArray());

const deleteSale = async (saleId) => {
  try {
    return connection().then((schema) =>
      schema.collection('sales').deleteOne({ _id: ObjectId(saleId) }),
    );
  } catch (error) {
    return error;
  }
};

module.exports = { create, sales, sale, deleteSale };
