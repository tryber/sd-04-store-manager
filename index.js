const express = require('express');
const app = express();
const controllers = require('./controllers');

app.use('/', controllers.productController);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

app.listen(3001, () => console.log('Aplicação rodando!'));