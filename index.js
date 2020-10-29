const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

const productController = require('./src/controllers/productController')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/products', productController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Listening on ${port}!`));
