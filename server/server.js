const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', require('./route/loginRoute'));
app.use('/', require('./route/booksRoute'));

app.get('/', (req, res) => {
    res.status(200).send('Bem vindo a API de livros com Node e PostgreSQL');
});

app.use((error, req, res, next) => {
	if (error.message === 'Book already exists.') {
		return res.status(409).send(error.message);
	}
	if (error.message === 'Book rented.' || error.message === 'Book not found.') {
		return res.status(404).send(error.message);
	}
	if (error.message === 'User not found.') {
		return res.status(401).send(error.message);
	}
	res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Aplicação iniciada na porta ${PORT}`));