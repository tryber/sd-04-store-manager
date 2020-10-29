const express = require('express');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/products', productController);
app.use('/sales', salesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(port, () => console.log('Ouvindo porta 3000.'));
