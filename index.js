const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(express.json());

app.use('/products', productsController);
app.use('/sales', salesController);

app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('servidor ok');
});
