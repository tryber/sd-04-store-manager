const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAllVendas = async () => connect().then((db) => db.collection('sales').find({}).toArray());

const findVendaById = async (id) =>
  connect().then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

const criarVenda = async (itensSold) =>
  connect()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then(({ insertedId }) => ({
      _id: insertedId,
      itensSold,
    }));

module.exports = {
  getAllVendas,
  findVendaById,
  criarVenda,
};
