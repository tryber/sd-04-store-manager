const express = require('express');
const bodyParser = require('body-parser');
const { isValidProduct } = require('./services/verificacao');
const productController = require('./controllers/productsController');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
    response.send();
});


app.use(bodyParser.json());

//  Requisito 1
app.post('/products', isValidProduct(), productController.cadastroProduto);


app.listen(3000, () => console.log('Amãe ta on na 3000!'));
