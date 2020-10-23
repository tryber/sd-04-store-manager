const express = require('express');
const bodyParser = require('body-parser');
const { isValidProduct, isNew } = require('./services/verificacao');
const productController = require('./controllers/productsController');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
    response.send();
});

app.use(bodyParser.json());

//  Requisito 1
app.post('/products', isValidProduct, isNew, productController.cadastroProduto);
//  Requisito 2
app.get('/products', productController.listaDeProdutos);
app.get('/products/:id', productController.produtoPorId);
//  Requisito 3
app.put('/products/:id', isValidProduct, productController.atualizarProduto)

app.listen(3000, () => console.log('A mãe ta on na 3000!'));
