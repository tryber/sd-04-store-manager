const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const productController = require('./controllers/productController');

app.use('/products', productController);
// app.use('/products/:id', productController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('=-----> Server running on port 3000 <-----='));
