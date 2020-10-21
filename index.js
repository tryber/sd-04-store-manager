const express = require('express');
const bodyParser = require('body-parser');

const produtoController = require('./crontrollers/produtosController');
const vendasController = require('./crontrollers/vendasController');

const app = express();

app.use(bodyParser.json()); // ou podemos usar o express.json()

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/products', produtoController.listaProdutos);
app.post('/products', produtoController.addProduto);

app.get('/products/:id', produtoController.produtoById);
app.put('/products/:id', produtoController.atualizaProduto);
app.delete('/products/:id', produtoController.deletaProduto);

app.post('/sales', vendasController.addVenda);
app.get('/sales', vendasController.listaVendas);
app.get('/sales/:id', vendasController.vendaById);

app.put('/sales/:id', vendasController.atualizaVenda);
app.delete('sales/:id', vendasController.deletaVenda);

app.listen(3001, () => {
  console.log('Ouvindo a porta 3001!');
});
