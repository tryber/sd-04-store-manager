const connection = require('./connection');

const cadastraProduto = async (name, quantity) => {
  const data = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );

  return data.ops[0];
};

const findByName = async (obj) => {
  const data = await connection()
    .then((db) => db.collection('products').find(obj).toArray())
    .then((data) => data.map(({ name }) => ({ name })));

  console.log(data);
  return data[0];
};

module.exports = {
  cadastraProduto,
  findByName,
};
