const express = require('express');
const bodyParser = require('body-parser');
const { isValidProduct, isNew, isValidSale } = require('./services/verificacao');
const productController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

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
app.put('/products/:id', isValidProduct, productController.atualizarProduto);
// Requisito 4
app.delete('/products/:id', productController.deletarProduto);


//  Requisito 5
app.post('/sales', isValidSale, salesController.cadastroVenda);
//  Requisito 6
app.get('/sales', salesController.listAllSales);
app.get('/sales/:id', salesController.listOneSale);

app.listen(3000, () => console.log('A mãe ta on na 3000!'));
