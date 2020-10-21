const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const controllers = require('./controllers');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', controllers.productController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

app.listen(3000, () => console.log('Aplicação rodando!'));