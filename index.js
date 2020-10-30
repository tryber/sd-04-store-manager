const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
const port = 3000;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({}));
// extented: false

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

app.use('/products', productsController);
app.use('/sales', salesController);

app.listen(port, () => console.log(`Funfou!!! Listening on port: ${port}`));
