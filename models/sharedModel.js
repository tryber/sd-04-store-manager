const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Using input for db.collection => Thanks for the ideai @Frederico Campello
const getAll = async (collectionName) =>
  connection().then((db) => db.collection(collectionName).find().toArray());


  module.exports = {
    getAll,
  };
