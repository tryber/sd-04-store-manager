const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();

app.use(bodyParser.json());

app.use('/products', productController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Conectado'));
