// const { Db, ObjectId } = require('mongodb');
const connection = require('./connection');

const findByName = async (name) => {
  console.log('findByName');
  return connection().then((db) => db.collection('products').findOne({ name }));
};

const add = async (name, quantity) => {
  console.log('passou aqui');
  return connection().then((db) => db.collection('products').insertOne({ name, quantity }));
};

module.exports = { findByName, add };
