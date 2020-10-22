const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');

const app = express();
const port = 3000;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({}));
// extented: false

app.use('/products', productsController);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

app.listen(port, () => console.log(`Funfou!!! Listening on port: ${port}`));
