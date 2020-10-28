const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addVendas = async (itensSold) => {
  const vendaAdicionada = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold }));
  // console.log('venda adiconada', vendaAdicionada.ops);
  return vendaAdicionada.ops;
};

const listaVendas = async () =>
  connection().then((db) => db.collection('sales').find({}).toArray());

const vendaPorId = async (id) =>
  connection().then((db) => db.collection('sales').findOne(ObjectId(id)));

const atualizarVenda = async (id, novoArray) => {
  await connection().then((db) =>
    // ponto de atencao
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: novoArray } }));
  return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const deletaVenda = async (id) =>
  connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  addVendas,
  listaVendas,
  vendaPorId,
  atualizarVenda,
  deletaVenda,
};

// const atualizarVenda = async (id, productId, quantity) => {
//   await connection().then((db) =>
//     // ponto de atencao
//     db
//       .collection('sales')
//       .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: { productId, quantity } } }),
//   );
//   return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
// };
