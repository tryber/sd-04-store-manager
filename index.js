const express = require('express');

const app = express();

app.use(express.json());
app.get('/', (request, response) => {
  response.send('teste');
});
const PORT = 3000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
