const connection = require('./connection');

const cadastro = async ({ name, quantity }) => {
  const db = await connection();
  const produto = await db.collection('produtos').insertOne({ name, quantity });
  return produto.insertedId;
};

const findByName = async (name) => {
  connection().then((db) => db.collection('produtos').findOne(name));
};

module.exports = {
  cadastro,
  findByName,
};
