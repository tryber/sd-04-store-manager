const bodyParser = require('body-parser');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended:true })); // <- se os dados via POST vier do HTML
app.use(bodyParser.json); // <- se os dados via POST vier da URL ( blabla/lele )

// não remova esse endpoint, e para o avaliador funcionar *
app.get('/', (request, response) => {
    response.send();
});

app.listen(3000,()=>{
    console.log('Rodando na porta 3000 liso...')
}) // escutando na porta 3000 ....
