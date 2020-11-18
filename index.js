const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended:true })); // <- se os dados via POST vier do HTML
app.use(bodyParser.json()); // <- se os dados via POST vier da URL ( blabla/lele )

// não remova esse endpoint, e para o avaliador funcionar *
app.get('/', (request, response) => {
    response.send();
});

app.use('/products', productsController);

app.listen(port, ()=>{
    console.log(`Rodando na porta ${port} liso...`);
}); // escutando na porta 3000 ...


/********************* */
// const express = require('express');

// const productsController = require('./controllers/productsController');
// //const salesController = require('./controllers/salesController');

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use('/products', productsController);

// //app.use('/sales', salesController);

// // não remova esse endpoint, e para o avaliador funcionar
// app.get('/', (request, response) => {
// response.send('Hello World');
// });

// app.listen(port, () => console.log(`App listening on port ${port}`)); 