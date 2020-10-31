const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/productsController');
const app = express();
const port = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});
app.use('/products', ProductsController);
app.use('/sales', SalesController);

app.listen(port, () => console.log(`Aplicativo rodando na porta ${port}`));