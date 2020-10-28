const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


// não remova esse endpoint, e para o avaliador funcionar, Ok. Lerigou!
app.get('/', (_req, res) => {
  res.send();
});

app.listen(3000, console.log('Rodando na 3000'));
