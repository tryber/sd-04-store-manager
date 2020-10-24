const express = require('express');
const productController = require('./controller/productController');
const salesController = require('./controller/salesController');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/products', productController.cadastraProduto);
app.get('/products', productController.listaProdutos);
app.get('/products/:id', productController.listProdutosPorId);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

app.post('/sales', salesController.cadastraVenda);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});