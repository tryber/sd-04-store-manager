const express = require('express');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

const app = express();

app.use(express.json());
app.use('/products', productController);
app.use('/sales', saleController);
app.get('/', (request, response) => {
  response.send();
});
const PORT = 3000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
