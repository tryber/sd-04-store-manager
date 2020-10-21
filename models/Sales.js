const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addSales = async (itensSold) => {
  try {
    const db = await connection();
    const addResult = await db.collection('sales')
      .insertOne({ itensSold });
    return {
      "_id" : addResult.insertedId,
      "itensSold" : [
        {
          "productId" : "5f43cbf4c45ff5104986e81d", "quantity" : 2
        }
      ]
    };
  } catch (error) {
    return process.exit(1);
  }
};