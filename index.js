const express = require('express');
const productsController = require('./controllers/products.Controller');

const app = express();

app.use(express.json());

app.use('/products', productsController);

app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('servidor ok');
});
