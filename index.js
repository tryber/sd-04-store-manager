const express = require('express');
const storeController = require('./controller/storeController');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/products', storeController.cadastraProduto);
app.get('/products', storeController.listaProdutos);
app.get('/products/:id', storeController.listProdutosPorId);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
