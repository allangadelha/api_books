const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', require('./route/booksRoute'));

app.use(function (error, req, res, next) {
	if (error.message === 'Book already exists.') {
		return res.status(409).send(error.message);
	}
	if (error.message === 'Book rented.' || error.message === 'Book not found.') {
		return res.status(404).send(error.message);
	}
	res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Aplicação iniciada na porta ${PORT}`));