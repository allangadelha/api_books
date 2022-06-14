const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', require('./route/booksRoute'));

app.listen(PORT, () => console.log(`Aplicação iniciada na porta ${PORT}`));