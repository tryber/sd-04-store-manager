const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send('ok');
});

app.use('/products', productController);

app.listen(3000);
