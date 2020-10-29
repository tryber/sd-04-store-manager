const express = require('express');

const app = express();

const productController = require('./src/controllers/productController');
const salesController = require('./src/controllers/salesController');

app.use(express.json());

app.use('/products', productController);
app.use('/sales', salesController);

app.get('/', (request, response) => {
  response.send();
});

const port = 3000;
app.listen(port, () => console.log(`Listening on ${port}!`));
