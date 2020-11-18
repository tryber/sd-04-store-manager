const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAllVendas = async () => connect().then((db) => db.collection('sales').find({}).toArray());

const findVendaById = async (id) =>
  connect().then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

module.exports = {
  getAllVendas,
  findVendaById,
};
