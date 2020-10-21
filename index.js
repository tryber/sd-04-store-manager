// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
    response.send();
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

//Requisito 1
app.post('/products',  )


app.listen(3000, () => console.log('Amãe ta on na 3000!'));